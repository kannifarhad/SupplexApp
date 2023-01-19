import { PrismaClient, User } from "@prisma/client";
import * as Sentry from "@sentry/node";
import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import { Request, Response } from "express";
import { prisma } from "./clients";
import { decodeJWT, getJWTPayload } from "./utils";

export interface Context {
	request: Request;
	response: Response;
	prisma: PrismaClient;
	user: Omit<User, 'password'| 'updatedAt' | 'createdAt'> | null;
	dataSources: ReturnType<typeof createDataSources>;
	transaction: any;
	// transaction: Transaction | null;
}

type ContextWithoutSources<T> = Omit<T, "dataSources">;

export function createSubGraphContext(
	request: ExpressContext
): ContextWithoutSources<Context> {
	const jwtData = decodeJWT(request.req.headers.authorization!);
	let userData = null;
	if(!!jwtData){
		const { iat, exp, ...userDataCleaned } = jwtData;
		userData = userDataCleaned;
	}
	return {
		...request,
		response: request?.res,
		request: request?.req,
		prisma: prisma,
		user: userData,
		transaction: null,
	};
}

export async function createContext(request: ExpressContext) {
	const ctx: ContextWithoutSources<Context> = {
		...request,
		response: request?.res,
		request: request?.req,
		prisma: prisma,
		user: null,
		transaction: Sentry.startTransaction({
			op: "gql",
			name: "GraphQLTransaction", // this will be the default name, unless the gql query has a name
		})
	};

	const jwtData = getJWTPayload(ctx);

	// Set user context if using JWT
	if (jwtData) {
		ctx.user = await ctx.prisma.user.findFirst({
			where: {
				id: jwtData.id
			},
		});
	}

	return ctx;
}

export function createDataSources() {
	return {
	
	};
}
