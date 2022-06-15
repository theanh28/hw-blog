import dotenv from "dotenv";

import cors from "cors";
import express from "express";
import http from "http";
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'

import prismaConnect from "./prismaConnect.js";
import { createApolloServer } from "./schemas/index.js";

dotenv.config();

const port = process.env.PORT;
const jwtSecret = process.env.JWT_SECRET;

const prisma = await prismaConnect();

const app = express();
const httpServer = http.createServer(app);

const corsOptions = {
  origin: true,
  credentials: true
}
app.use(cors(corsOptions));
app.use(cookieParser()); 

const server = createApolloServer({
  prisma,
  httpServer,
  context: ({ req, res }) => {
    let user = {}
    try {
      user = jwt.verify(req.cookies["access-token"], jwtSecret)
    } catch(err) {
      // Unsuitable/non-exist access token
    }
    return { user, res };
  },
});

await server.start();

server.applyMiddleware({
  app,
  path: "/graphql",
  cors: false,
});

httpServer.listen({ port });
console.log(`🚀  Server ready at ${process.env.BASE_URL}:${port}${server.graphqlPath}`);
