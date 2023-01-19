import {
	PluginDefinition,
	GraphQLRequestContext,
	ApolloError,
} from "apollo-server-core";
import { Context } from "../../context";
import * as Sentry from "@sentry/node";
import { UserError } from "../../utils";
import "@sentry/tracing";

export function SentryPlugin(): PluginDefinition {
	return {
		async requestDidStart(requestContext: GraphQLRequestContext<Context>) {
			// Error context
			if (requestContext.context.user) {
				const { id, firstname, lastname } =
					requestContext.context.user;
				Sentry.setUser({
					name: [firstname, lastname].join(" "),
					id
				});
			} else {
				Sentry.setUser(null);
			}

			// set the transaction Name if we have named queries
			if (!!requestContext.operationName) {
				requestContext.context.transaction?.setName(
					requestContext.operationName!
				);
			}

			// Pass ID for Sentry error tracing
			const transactionId =
				requestContext.request.http?.headers.get("X-Transaction-ID");
			if (transactionId) {
				Sentry.configureScope(function (scope) {
					scope.setTag("transaction_id", transactionId);
				});
			}

			return {
				async didEncounterErrors(ctx) {
					// If we couldn't parse the operation, don't
					// do anything here
					if (!ctx.operation) {
						return;
					}
					for (const err of ctx.errors) {
						// Only report internal server errors,
						// all errors extending ApolloError should be user-facing
						if (err instanceof ApolloError || err instanceof UserError) {
							continue;
						}

						console.error(JSON.stringify(err));
						// Add scoped report details and send to Sentry
						Sentry.withScope((scope) => {
							// Annotate whether failing operation was query/mutation/subscription
							scope.setTag("kind", ctx.operation?.operation);

							// Name of the operation (ex. myProject)
							scope.setTag("operationName", ctx.operationName);

							// Log query and variables as extras
							// (make sure to strip out sensitive data!)
							scope.setExtra("query", ctx.request.query);
							scope.setExtra("variables", ctx.request.variables);
							if (err.path) {
								// We can also add the path as breadcrumb
								scope.addBreadcrumb({
									category: "query-path",
									message: err.path.join(" > "),
									level: Sentry.Severity.Debug,
								});
							}
							Sentry.captureException(err);
						});
					}
				},
				async willSendResponse({ context }) {
					context.transaction?.finish();
				},
				async executionDidStart() {
					return {
						willResolveField({ context, info }) {
							// hook for each new resolver
							const span = context.transaction?.startChild({
								op: "resolver",
								description: `${info.parentType.name}.${info.fieldName}`,
							});
							return () => {
								// this will execute once the resolver is finished
								span?.finish();
							};
						},
					};
				},
			};
		},
	};
}
