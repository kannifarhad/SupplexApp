import { gql } from "@apollo/client";

export const UserFields = gql`
  fragment UserFields on User {
    id
    email
    firstname
    lastname
    role
  }
`;

export const UserSingleFields = gql`
  fragment UserSingleFields on User {
    id
    email
    firstname
    lastname
    role
    status
  }
`;
