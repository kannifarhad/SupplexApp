import { gql } from "@apollo/client";
import { UserFieldsFragment } from "../fragments";

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        ...UserFieldsFragment
      }
      token
    }
  }
  ${UserFieldsFragment}
`;

export const LOGOUT = gql`
  mutation Logout {
    logout {
      ...UserFieldsFragment
    }
  }
  ${UserFieldsFragment}
`;

export const REFRESH_TOKEN = gql`
  mutation RefreshToken {
    refreshToken {
      user {
        ...UserFieldsFragment
      }
      token
    }
  }
  ${UserFieldsFragment}
`;