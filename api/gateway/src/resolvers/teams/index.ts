import { UserOnTeam } from "./../userOnTeam/type";
import { findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";
import { Prisma } from "@prisma/client";
import { UserInputError } from "apollo-server-errors";
import {
	Arg,
	Args,
	Ctx,
	FieldResolver,
	Mutation,
	Query,
	Resolver,
	Root,
} from "type-graphql";
import { Context } from "../../context";
import { UserError } from "../../utils";
import { PageInfo } from "../common/relay";
import { format } from "date-fns";

import {
	CreateTeamsInput,
	Teams,
	TeamsConnection,
	TeamsConnectionArgs,
	TeamsWhereUniqueInput,
	UpdateTeamsInput,
} from "./type";

@Resolver(Teams)
export class TeamsResolver {
	constructor() {}

	@Query((_) => Teams, {
		description: "Get specific team",
	})
	async team(
		@Arg("where") where: TeamsWhereUniqueInput,
		@Ctx() ctx: Context
	) {
		return await ctx.prisma.teams.findFirst({
			where: {
				id: where.id,
			},
			rejectOnNotFound: () =>
				new UserError(
					"FORBIDDEN",
					"The project with the given id does not exist!"
				),
		});
	}

	// @Query((_) => TeamsConnection, {
	// 	description: "Paginated list of teams",
	// })
	// async teamConnection(
	// 	@Args((_) => TeamsConnectionArgs)
	// 	args: TeamsConnectionArgs,
	// 	@Ctx() ctx: Context
	// ): Promise<TeamsConnection> {
	// 	if (!ctx.user) throw new UserError("UNAUTHENTICATED");

	// 	const baseArgs: Prisma.TeamsFindManyArgs = {
	// 		where: {
	// 			users: {
	// 				some: {
	// 					userId: ctx.user.id
	// 				},
	// 			},
	// 		},
	// 		orderBy: {
	// 			createdAt: "desc",
	// 		},
	// 	};

	// 	if (args.where) {
	// 		baseArgs.where = {
	// 			...baseArgs.where,
	// 			name: {
	// 				contains: args.where.name,
	// 				mode: "insensitive",
	// 			},
	// 		};
	// 	}

	// 	const connection = await findManyCursorConnection(
	// 		(args) => ctx.prisma.teams.findMany({ ...args, ...baseArgs }),
	// 		() => ctx.prisma.teams.count({ where: baseArgs.where }),
	// 		args
	// 	);

	// 	return {
	// 		...connection,
	// 		pageInfo: new PageInfo(connection.pageInfo),
	// 	};
	// }

	@Mutation((_) => Teams)
	async createTeam(
		@Arg("input") input: CreateTeamsInput,
		@Ctx() ctx: Context
	) {
		if (!ctx.user) throw new UserError("UNAUTHENTICATED");
		const teamName = input.name.replace(/\s{2,}/g, " ").trim();
		const duplicates = await ctx.prisma.teams.findFirst({
			where: {
				name: teamName,
				users: {
					some: {
						userId: ctx.user.id,
					},
				},
			},
		});

		if (duplicates) {
			throw new UserInputError("You already have a team with this name");
		}

		return await ctx.prisma.teams.create({
			data: {
				name: teamName,
				status: 'ACTIVE',
				organizationId:''
			},
		});
	}

	@Mutation((_) => Teams)
	async updateTeams(
		@Arg("where") where: TeamsWhereUniqueInput,
		@Arg("input") input: UpdateTeamsInput,
		@Ctx() ctx: Context
	) {
		const team = await ctx.prisma.teams.findFirst({
			where: {
				id: where.id,
			},
			rejectOnNotFound: true,
		});

		return ctx.prisma.teams.update({
			where: {
				id: team.id,
			},
			data: {
				...input
			},
		});
	}

	@Mutation((_) => Teams, {
		description: "Teams deletion",
	})
	async deleteTeams(
		@Ctx() ctx: Context,
		@Arg("where") where: TeamsWhereUniqueInput
	) {
		if (!ctx.user) throw new UserError("UNAUTHENTICATED");

		return ctx.prisma.teams.delete({
			where: {
				id: where.id,
			},
		});
	}

}
