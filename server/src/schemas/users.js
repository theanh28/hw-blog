import { gql } from "apollo-server-express";
import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET;

const typeDef = gql`
  type User {
    id: ID!
    username: String!
    password: String!
    blogs: [Blog]
    createdAt: String
  }

  type Query {
    getUsers(take: Int): [User]
    getUserById(id: ID!): User
  }

  type ReturnedUser {
    id: ID!
    username: String!
    blogs: [Blog]
    createdAt: String!
  }

  type Mutation {
    createUser(username: String!, password: String!): ReturnedUser
    updateUser(username: String!, password: String!): ReturnedUser
  }
`;

const resolver = (prisma) => ({
  Query: {
    getUsers: async (parent, args) => {
      try {
        const { take } = args;
        const result = await prisma.user.findMany({
          take,
          include: { blogs: true },
        });
        return result;
      } catch (err) {
        console.log("getUsers error:", err);
      }
    },
    getUserById: async (parent, args) => {
      try {
        const { id } = args;
        const result = await prisma.user.findUnique({
          where: { id },
          include: { blogs: true },
        });
        return result;
      } catch (err) {
        console.log("getUserById error:", err);
      }
    },
  },
  Mutation: {
    createUser: async (parent, args, context) => {
      // TODO: research a way to hide username + passwd
      try {
        const { username, password } = args;
        const { res } = context;
        const result = await prisma.user.create({
          data: {
            username,
            password,
          },
        });

        if (result) {
          const { id, username } = result;
          const accessToken = jwt.sign({ id, username }, jwtSecret, {
            expiresIn: "15m",
          });
          const refreshToken = jwt.sign({ id, username }, jwtSecret, {
            expiresIn: "7d",
          });
          res.cookie("refresh-token", refreshToken, {
            expires: new Date(Date.now() + 1000 * 60 * 15),
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
          });
          res.cookie("access-token", accessToken, {
            expires: new Date(Date.now() + 1000 * 60 * 15),
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
          });
        }
        return result;
      } catch (err) {
        console.log("createUser error:", err);
      }
    },
    updateUser: async (parent, args, context) => {
      // TODO: research a way to hide username + passwd
      // TODO: retrieve id from context + authorization
      try {
        const { id, username, password } = args;
        const { user } = context;
        const { id: verifiedUserId, username: verifiedUsername } = user;
        const result = await prisma.user.update({
          where: {
            id,
          },
          data: {
            username,
            password,
          },
        });
        return result;
      } catch (err) {
        console.log("updateUser error:", err);
      }
    },
  },
});

export default { typeDef, resolver };
