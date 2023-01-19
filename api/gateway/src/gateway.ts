import {
	ApolloGateway,
	GraphQLDataSourceProcessOptions
} from "@apollo/gateway";
import FileUploadDataSource from "@profusion/apollo-federation-upload";
import {
	ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground
} from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import express from "express";
import { readFileSync } from "fs";
import { graphqlUploadExpress } from "graphql-upload";
import http from "http";
import constants from "./constants";
import {
	Context,
	createContext
} from "./context";
import {
	applyEndpoints,
	applyHeaders,
	SentryPlugin
} from "./middleware";
import { corsConfig } from "./server";
import { createJWT, createRefreshCookie, decodeJWT } from "./utils";

class AuthenticatedDataSource extends FileUploadDataSource {
	async willSendRequest({
		request, context,
	}: GraphQLDataSourceProcessOptions<Context>) {
		if (!("request" in context))
			return;

		// Define specific targets for requests delegation [IMPORTANT!]
		const relevantHeaders = [
			"authorization",
			"origin",
			"apollographql-client-name",
			"apollographql-client-version",
		];

		for (const headerName of relevantHeaders) {
			const headerValue = context.request.headers[headerName];
			if (headerValue && typeof headerValue === "string") {
				request.http?.headers.set(headerName, headerValue);
			}
		}
		const refreshToken = context.request.cookies["refresh"];
		refreshToken && request.http?.headers.set("refresh", refreshToken);

		const jwt = context.request.headers.authorization!;
		const jwtData = decodeJWT(jwt);

		if( !!jwtData && 
			(
				!jwtData?.id || 
				!jwtData?.status || 
				!jwtData?.lastname || 
				!jwtData?.firstname || 
				!jwtData?.role
			)
		){
			const dbUserData = await context.prisma.user.findUnique({where: {id: jwtData?.id}});
			// Creates a new JWT with the necesary data.
			if(!dbUserData) return;
			const { password, ...cleanedData} = dbUserData;
			const jwt = await createJWT(
				cleanedData,
				"access",
				"1 days"
			);
			request.http?.headers.set("authorization", jwt);
		}
	}
	didReceiveResponse({ request, response, context }: any) {
		const refreshToken = response.http?.headers.get("refreshToken");
		// console.log("reseived from microservice", JSON.stringify(response))
		if (refreshToken) {
			const refreshCookie = createRefreshCookie(refreshToken);
			context.response.cookie(...refreshCookie);
		}
		return response;
	}
}

export async function startFederationGateway(port: number) {
	const app = express();
	const httpServer = http.createServer(app);
	let supergraphSdl = readFileSync("./schema.graphql").toString();
	const replacements = [
		{
			target: "http://localhost:4001/graphql",
			value: constants.MAIN_API_URL
		},
	];

	for (const r of replacements) {
		supergraphSdl = supergraphSdl.replace(r.target, r.value);
	}

	const gateway = new ApolloGateway({
		supergraphSdl,
		buildService({ name, url }) {
			return new AuthenticatedDataSource({ url });
		},
	});

	const gatewayServer = new ApolloServer({
		gateway,
		introspection: true,
		context: createContext,
		plugins: [
			ApolloServerPluginDrainHttpServer({ httpServer }),
			SentryPlugin(),
			ApolloServerPluginLandingPageGraphQLPlayground()
		],
	});
	await gatewayServer.start();
	app.use(cookieParser());
	app.use(
		graphqlUploadExpress({ maxFileSize: constants.MAX_FILE_SIZE, maxFiles: 10 })
	);
	gatewayServer.applyMiddleware({ app, path: "/graphql", cors: corsConfig, bodyParserConfig: {
		limit: constants.MAX_REQUEST_BODY_SIZE
	}});
	
	// Express Middleware
	applyHeaders(app);
	applyEndpoints(app);

	await new Promise<void>((resolve) => {
		httpServer.listen({ port });
		resolve();
	});
	console.info(
		`🚀 Gateway ready at http://localhost:${port}${gatewayServer.graphqlPath}`
	);
	console.info(
		`📡 Subscriptions ready at ws://localhost:${port}${gatewayServer.graphqlPath}`
	);
	console.info(
		`🏥 Health check ready at http://localhost:${port}/.well-known/apollo/server-health`
	);
}
