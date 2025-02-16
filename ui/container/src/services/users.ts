import client from "./clients/apolloClient";
import { UserFieldsFragment } from "../types";
import { UsersList } from "./graphql/queries/users";

export const fetchUsersList = async () => {
  return client.query<{users: UserFieldsFragment[]}>({
    query: UsersList,
  }).then((result)=> result.data?.users);
};
