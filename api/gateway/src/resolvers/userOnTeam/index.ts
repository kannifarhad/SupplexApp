import { UserOnTeams } from "@prisma/client";
import { UserInputError } from "apollo-server-core";
import {
	Arg,
	Ctx,
	FieldResolver,
	Mutation,
	Query,
	Resolver,
	Root
} from "type-graphql";
import { Context } from "../../context";
import {  UserError } from "../../utils";
import {
	TeamsWhereUniqueInput,
} from "../teams/type";
import { User } from "../user/type";

import {
	AddTeamMembersInput,
	UserOnTeam,
	UpdateUserOnTeamsInput,
	UserOnTeamWhereUniqueInput
} from "./type";


@Resolver(UserOnTeam)
export class UserOnTeamResolver {
	@FieldResolver((_) => User)
	async user(@Root() root: UserOnTeam, @Ctx() ctx: Context): Promise<User> {
		return await ctx.prisma.user.findFirst({
			where: {
				id: root.userId, 
			},
			rejectOnNotFound: true,
		});
	}

	@FieldResolver()
	async team(@Root() root: UserOnTeam, @Ctx() ctx: Context) {
		return await ctx.prisma.teams.findFirst({
			where: {
				id: root.teamId,
			},
		});
	}

	@Mutation((_) => [UserOnTeam], {
		description: "Add an existing Organization users to the team",
	})
	async addTeamMembers(
		@Arg("where") where: TeamsWhereUniqueInput,
		@Arg("input") input: AddTeamMembersInput,
		@Ctx() ctx: Context
	): Promise<UserOnTeams[]> {
		if (!ctx.user) throw new UserError("UNAUTHENTICATED");
		const userIds = input.userIds;
		let targetUserList = await ctx.prisma.user.findMany({
			where: {
				id: { in: userIds },
			},
		});

		const teams = await ctx.prisma.teams.findFirst({
			where: {
				id: where.id,
			},
			include: {
				users: {
					where: {
						user: {
							id: { in: userIds },
						},
					},
					select: {
						user: true,
					},
				},
			},
			rejectOnNotFound: () => new UserInputError("team not found"),
		});

		// Validation of ldap and if one of user already exists in project
		for (let index = 0; index < userIds.length; index++) {
			const userId = userIds[index];

			const isAlreadyMemmber = teams.users.find(
				(user) => user.user.id === userId
			);
			if (isAlreadyMemmber) {
				throw new UserError(
					"BAD_USER_INPUT",
					`User with ${isAlreadyMemmber.user.email} email is already a member of the team`
				);
			}
		}

		//TODO: Replace transaction after the create bulk issue is resolved in Prisma issue url https://github.com/prisma/prisma/issues/8131
		// const response = await ctx.prisma.userOnTeams.createMany({
		// 	data: targetUserList.map(user=>({
		// 		userId: user.id,
		// 		role: "CONSUMER",
		// 		teamId: input.teamId,
		// 	})),
		// });

		return await ctx.prisma.$transaction(
			targetUserList.map((user) => ctx.prisma.userOnTeams.create({ 
				data: {
					userId: user.id,
					role: "CONSUMER",
					teamId: input.teamId,
				}, 
			})),
		 );

	
		
	}

	@Mutation((_) => UserOnTeam, {
		description: "Remove a user from an existing team",
	})
	async deleteTeamMember(
		@Ctx() ctx: Context,
		@Arg("where") where: UserOnTeamWhereUniqueInput
	) {
		if (!ctx.user) throw new UserError("UNAUTHENTICATED");
		await ctx.prisma.userOnTeams.findFirst({
			where: {
				userId: where.userId,
				teamId: where.teamId,
			},
			include: {
				user: true,
			},
			rejectOnNotFound: () =>
				new UserError("BAD_USER_INPUT", "Invalid user or team not found"),
		});

	
		return await ctx.prisma.userOnTeams.delete({
			where: {
				userId_teamId: {
					userId: where.userId,
					teamId: where.teamId,
				},
			},
		});
	}

	@Mutation((_) => UserOnTeam)
	async updateUserOnTeam(
		@Arg("input") input: UpdateUserOnTeamsInput,
		@Arg("where") where: UserOnTeamWhereUniqueInput,
		@Ctx() ctx: Context
	): Promise<UserOnTeam> {
		if (!ctx.user) throw new UserError("UNAUTHENTICATED");

		return await ctx.prisma.userOnTeams.upsert({
			where: {
				userId_teamId: {
					teamId: where.teamId,
					userId: where.userId,
				},
			},
			create: {
				...input,
				...where,
			},
			update: {
				...input,
			},
			include: { 
				team: true 
			},
		});
	}

}
