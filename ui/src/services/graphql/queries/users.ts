import { gql } from "@apollo/client";
import { UserFieldsFragment } from "../fragments";

export const UsersList = gql`
  query Users {
    users {
      ...UserFieldsFragment
    }
  }
  ${UserFieldsFragment}
`;