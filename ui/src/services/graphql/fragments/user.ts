import { gql } from "@apollo/client";

export const UserFieldsFragment = gql`
  fragment UserFieldsFragment on User {
    id
    email
    firstname
    photo
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
    photo
    address
    location
    phone
    role
    status
  }
`;
