import { buildSubgraphSchema, printSubgraphSchema } from "@apollo/subgraph";
import { addResolversToSchema } from "apollo-graphql";
import { gql } from "apollo-server-core";
import { specifiedDirectives } from "graphql";
import { applyMiddleware } from "graphql-middleware";
import {
	buildSchema,
	BuildSchemaOptions,
	createResolversMap
} from "type-graphql";
import { Context } from "./context";
import { permissions } from "./permissions";
import * as r from "./resolvers";
import { User } from "./resolvers/user/type";
import { UserError } from "./utils";

export const generateSchema = async () => {
	const schema = await buildFederatedSchema({
		resolvers: [
			r.UserResolver,
			r.UserOnTeamResolver
		],
		orphanedTypes: [User],
	});

	// Set permissions layer
	const protectedSchema = applyMiddleware(schema, permissions);
	
	addResolversToSchema(protectedSchema, {
		// User: {
		// 	async __resolveReference(
		// 		reference: Pick<User, "id">, args
		// 	): Promise<User | null> {
		// 		const ctx: Context = args as any;
		// 		return await ctx.prisma.user.findFirst({
		// 			where: {
		// 				id: reference.id,
		// 			},
		// 			rejectOnNotFound: () =>
		// 				new UserError("BAD_USER_INPUT", `User with "${reference.id}" id does not exist`)
		// 		});
		// 	}
		// },
	});

	return protectedSchema;
};

export async function buildFederatedSchema(
	options: Omit<BuildSchemaOptions, "skipCheck">
) {
	const schema = await buildSchema({
		...options,
		directives: [
			...specifiedDirectives,
			// ...directivesWithNoDefinitionNeeded,
			...(options.directives || []),
		],
		skipCheck: true,
	});

	// Prepare for Federation
	const federatedSchema = buildSubgraphSchema({
		resolvers: createResolversMap(schema) as never,
		typeDefs: gql(printSubgraphSchema(schema)),
	});

	return federatedSchema;
}
