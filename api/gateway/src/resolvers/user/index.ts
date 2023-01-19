import { findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";
import { Prisma } from "@prisma/client";
import Axios from "axios";
import * as bcrypt from "bcryptjs";
import * as https from "https";
import * as jwt from "jsonwebtoken";
import { verify } from "jsonwebtoken";
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
import constants from "../../constants";
import { Context } from "../../context";
import {
	createTokens,
	InputError,
	JwtPayload,
	removeRefreshCookie,
	UserError,
} from "../../utils";
import {
	AuthPayload,
	CreateUserInput,

	LoginInput,

	UpdateUserInput,
	User,
	UserConnection,
	UserConnectionArgs,
	UserWhereInput,
	UserWhereUniqueInput,
	SetUserDefaultProjectInput
} from "./type";



@Resolver((_) => User)
export class UserResolver {
	@Query((_) => User, {
		description: "Return user information",
	})
	user(
		@Ctx() ctx: Context,
		@Arg("where") where: UserWhereUniqueInput
	) {
		if (!ctx.user) throw new UserError("UNAUTHENTICATED");
		return ctx.prisma.user.findUnique({
			where:{
				id: where.id
			}
		});
	}

	@Query((_) => User, {
		description: "Return self information",
	})
	me(
		@Ctx() ctx: Context
	) {
		if (!ctx.user) throw new UserError("UNAUTHENTICATED");
		return ctx.prisma.user.findUnique({
			where:{
				id: ctx.user.id
			}
		});
	}
	
	@Mutation((_) => AuthPayload, {
		description: "Login with credentials",
	})
	async login(@Arg("input") input: LoginInput, @Ctx() ctx: Context) {
		const [user] = await ctx.prisma.user.findMany({
			where: {
				email: input.email,
				password: {
					not: "",
				},
			},
		});

		if (!user) {
			throw new UserError("BAD_USER_INPUT", "User does not exist");
		}

		const isPasswordMatch = await bcrypt.compare(
			input.password,
			user.password!
		);

		if (!isPasswordMatch) {
			throw new UserError("BAD_USER_INPUT", "Invalid credentials");
		}

		if (user.status !== "ACTIVE") {
			throw new UserError("INACTIVE");
		}

		const { accessToken } = await createTokens(user, ctx);

		return {
			user,
			token: accessToken,
		};
	}

	@Mutation((_) => User, {
		description: "Safety measure to close current session",
	})
	async logout(@Ctx() ctx: Context) {
		removeRefreshCookie(ctx);
		if (!ctx.user) {
			throw new UserError("BAD_USER_INPUT", "User does not exist");
		}

		return ctx.user;
	}

	@Mutation((_) => AuthPayload, {
		description: "Request tokens renewal with existing cookie",
	})
	async refreshToken(@Ctx() ctx: Context) {
		const { prisma, request } = ctx;
		const refreshToken = request.get("refresh");

		if (!refreshToken) throw Error("Invalid refresh token");
		const decodedRefresh = verify(
			refreshToken,
			constants.JWT_REFRESH_SECRET as string
		) as JwtPayload;

		const { id: userId } = decodedRefresh;

		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
		});

		if (!userId || !user) {
			removeRefreshCookie(ctx);
			throw Error("Invalid token");
		}

		const { accessToken } = await createTokens(user, ctx);

		return {
			user,
			token: accessToken,
		};
	}

	
	@Mutation((_) => User, {
		description: "Update details of a user (admin only)",
	})
	async updateUser(
		@Arg("input") input: UpdateUserInput,
		@Arg("where") where: UserWhereUniqueInput,
		@Ctx() ctx: Context
	) {
		const { prisma } = ctx;

		const validUser = await prisma.user.findFirst({
			where: {
				id: where.id,
			},
			rejectOnNotFound: () => new InputError("Invalid user"),
		});

		const user = await prisma.user.update({
			where: {
				id: validUser.id,
			},
			data: {
				status: input.status || undefined,
				role: input.role || undefined,
			},
		});


		return user;
	}
	
	@Mutation((_) => User, {
		description: "Create new user details of a user",
	})
	async createUser(@Arg("input") input: CreateUserInput, @Ctx() ctx: Context) {
		const { prisma } = ctx;

		const targetUser = await ctx.prisma.user.findUnique({
			where: {
				email: input.email.toLowerCase(),
			},
		});
		
		if (targetUser) {
			throw new UserError(
				"BAD_USER_INPUT",
				"User with this e-mail already exists in SUPPLEX!"
			);
		}

		const user = await prisma.user.create({
			data: {
				status: input.status || undefined,
				role: input.role || undefined,
				// teamId: input.teamId,
				email: input.email.toLowerCase(),
				firstname: input.firstname,
				lastname: input.lastname,
			},
		});

		return user;
	}
}
