import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    users(query: String): [User!]!
    me: User!
  }

  type Mutation {
    createUser(data: CreateUserInput): AuthPayload!
    login(data: LoginInput): AuthPayload!
    deleteUser: User!
    updateUser(data: UpdateUserInput!): User!
  }

  type AuthPayload {
    user: User!
    token: String!
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input UpdateUserInput {
    name: String
    email: String
    password: String
  }

  type User {
    id: ID!
    name: String!
    email: String
    password: String!
  }

  enum MutationType {
    CREATED
    DELETED
    UPDATED
  }
`;

export { typeDefs as default };
