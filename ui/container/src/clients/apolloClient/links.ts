import { ApolloLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import { sentenceCase } from "sentence-case";
import {
  SUPPLEX_API_URL,
  LAST_LOCATION_KEY,
  LOCATION_SKIP_LIST,
} from "../../constants";
import store from "../../store";
import { logout } from "../../store/auth";
import { getAuthentication, setTransactionId } from "./auth";
import { WebSocketLink } from "@apollo/client/link/ws";

import { setError } from "../../store/error";
import * as Sentry from "@sentry/react";
import React from "react";

// TODO: Adapt subscriptions to Apollo Federation
const supplexUrl = `${SUPPLEX_API_URL}/graphql`;

export const httpLink = createUploadLink({
  uri: supplexUrl,
  credentials: "include",
  headers: {
    "keep-alive": "true",
  },
}) as unknown as ApolloLink;

export const wsLink = new WebSocketLink({
  uri: supplexUrl.replace("http", "ws"),
  options: {
    lazy: true,
    reconnect: true,
    connectionParams: async () => {
      return {
        Authorization: await getAuthentication(),
      };
    },
  },
});

export const authLink = setContext(async (_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      "keep-alive": true,
      authorization: await getAuthentication(),
      "X-Transaction-ID": setTransactionId(),
    },
  };
});

export const errorLink = onError(
  ({ networkError, graphQLErrors, operation, response }) => {
    console.log('APOLLO ERROR')
    const ignoredOperations = ["Logout"];

    // Selective error skipping
    if (ignoredOperations.includes(operation.operationName) && response) {
      return (response.errors = undefined);
    }

    if (graphQLErrors) {
      // Handle first error on list
      for (let err of graphQLErrors.filter((_, idx) => !idx)) {
        switch (err.extensions?.code) {
          case "UNAUTHENTICATED":
            const lastLocation =
              window.localStorage.getItem(LAST_LOCATION_KEY) || undefined;
            const urlsToSkip = [...LOCATION_SKIP_LIST, undefined];
            // Avoid to clean the lastLocation when comes from a public url
            urlsToSkip.includes(lastLocation)
              ? store.dispatch(logout())
              : store.dispatch(logout(false, true));
            break;
          case "FORBIDDEN":
            const url = window.location;
            store.dispatch(
              setError({
                errorSection: url.pathname,
                errorType: "FORBIDDEN",
                errorContent: err.extensions,
              })
            );
            console.log("Forbidden", err.message);
            // notification.error({
            //   message: "Forbidden",
            //   description: err.message,
            // });
            break;
          case "INACTIVE":
            console.log("INACTIVE", err.message);

            // notification.warning({
            //   duration: 0,
            //   message: "Inactive Account",
            //   description: `Your access request to ISAAC is currently in review. 
            // If it has taken more than 1 business day since you submitted the request or for any questions, 
            // please contact us at isaac@jnj.onmicrosoft.com`,
            // });
            store.dispatch(logout());
            break;

          case "MISSING_ACCESS_REQUEST":
            window.location.replace("/join");
            break;

          default:
            const code = err.extensions?.code;
            // const eventId = Sentry.captureException(new Error(err.message), {
            //   tags: {
            //     code,
            //     serviceName: err.extensions.serviceName,
            //   },
            //   extra: {
            //     ...err.extensions.exception,
            //     ...err.extensions.response,
            //   },
            // });
            // notification.error({
            //   message: sentenceCase(code),
            //   style: { width: 500 },
            //   description: [
            //     err.message,
            //     React.createElement("br"),
            //     // eventId ? `Event ID: ${eventId}` : undefined,
            //   ],
            // });
            console.log("default", code, err.message);

            break;
        }
      }
    } else if (networkError) {
      console.log("Network Error", networkError.message);
      // Sentry.captureException(new Error(networkError.message), {
      //   tags: {
      //     operationName: operation.operationName,
      //   },
      //   extra: {
      //     ...operation,
      //   },
      // });
      // notification.error({
      //   message: "Network Error",
      //   description: networkError.message,
      // });
    }
  }
);

