import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import _ from "lodash";

import Blogs from "./blogs.js";
import Users from "./users.js";

const createApolloServer = ({ prisma, httpServer, context = () => {} }) => {
  const typeDefs = [Blogs.typeDef, Users.typeDef];
  const resolvers = _.merge(Blogs.resolver(prisma), Users.resolver(prisma));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context,
  });

  return server;
};

export { createApolloServer };
