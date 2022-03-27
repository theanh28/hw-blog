import { gql } from "@apollo/client";

const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      id
      createdAt
      username
    }
  }
`;

export { CREATE_USER };
