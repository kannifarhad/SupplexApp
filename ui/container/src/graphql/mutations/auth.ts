import { gql } from "@apollo/client";
import { UserFields } from "../fragments";

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        ...UserFields
      }
      token
    }
  }
  ${UserFields}
`;

export const LOGOUT = gql`
  mutation Logout {
    logout {
      ...UserFields
    }
  }
  ${UserFields}
`;

export const REFRESH_TOKEN = gql`
  mutation RefreshToken {
    refreshToken {
      user {
        ...UserFields
      }
      token
    }
  }
  ${UserFields}
`;