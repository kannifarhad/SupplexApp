import { ApolloClient, ApolloLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { authLink, errorLink, httpLink, wsLink } from "./links";

// Switch link depending on the operation type
const splitLink = split(
  ({ query, getContext }) => {
    const context = getContext();
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

// Remove typename field from responses
const cleanTypeName = new ApolloLink((operation, forward) => {
  const context = operation.getContext();
  // If has variables and does not upload a file
  if (operation.variables && !context?.isUpload) {
    const omitTypename = (key: string, value: any) =>
      key === "__typename" ? undefined : value;
    operation.variables = JSON.parse(
      JSON.stringify(operation.variables),
      omitTypename
    );
  }
  return forward(operation).map((data) => {
    return data;
  });
});

// Main application client
const client = new ApolloClient({
  // Required constructor fields
  uri:'http://localhost:4000/graphql',
  link: ApolloLink.from([
    authLink,
    cleanTypeName,
    errorLink,
    splitLink
  ]),
  cache: new InMemoryCache(),
  connectToDevTools: true,
  // Optional constructor fields
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});

export const refreshingClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
    },
  },
});

export { client as default };
