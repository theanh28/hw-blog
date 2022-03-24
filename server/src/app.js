require("dotenv").config();

import { ApolloServer } from "apollo-server";

import prismaConnect from "./schemas/prismaConnect";
import Blogs from "./schemas/blogs";

const typeDefs = [Blogs.typeDef];

let resolvers;

prismaConnect()
  .then((prisma) => {
    resolvers = {
      ...Blogs.resolver(prisma),
    };

    const server = new ApolloServer({ typeDefs, resolvers });

    server.listen().then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`);
    });
  });
