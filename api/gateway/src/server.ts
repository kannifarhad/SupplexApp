require("console-stamp")(console, {
	format: ':date("ddd mmm dd yyyy HH:MM:ss Z") :label(7)',
});
import {
	ApolloServerPluginDrainHttpServer,
	ApolloServerPluginLandingPageGraphQLPlayground
} from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import express from "express";
import { graphqlUploadExpress } from "graphql-upload";
import http from "http";
import "reflect-metadata";
import constants from "./constants";
import {
	createDataSources,
	createSubGraphContext
} from "./context";
import {
	applyHeaders
} from "./middleware";
import { generateSchema } from "./schema";

const { IS_DEV } = constants;
const localOrigins = [/^http:\/\/localhost:\d{4}$/];
const prodOrigins = [/^https:\/\/.*\.supplex\.io$/];
export const corsConfig = {
	origin: IS_DEV ? localOrigins : prodOrigins,
	credentials: true,
};



export async function startServer(port: number) {
	const app = express();
	const httpServer = http.createServer(app);
	const schema = await generateSchema();

	const server = new ApolloServer({
		schema,
		context: createSubGraphContext,
		dataSources: createDataSources,
		plugins: [
			ApolloServerPluginDrainHttpServer({ httpServer }),
			ApolloServerPluginLandingPageGraphQLPlayground(),
		],
	});
	await server.start();
	app.use(cookieParser());
	app.use(
		graphqlUploadExpress({ maxFileSize: constants.MAX_FILE_SIZE, maxFiles: 10 })
	);
	server.applyMiddleware({ app, path: "/graphql", cors: corsConfig });
	applyHeaders(app);

	await new Promise<void>((resolve) => {
		httpServer.listen({ port });
		resolve();
	});
	console.log(
		`🚀 Main Microservice ready at http://localhost:4001${server.graphqlPath}`
	);

	return {
		app,
		server
	}
}


