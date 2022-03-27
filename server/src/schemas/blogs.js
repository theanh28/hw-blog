import { gql } from "apollo-server-express";

const typeDef = gql`
  type Blog {
    id: ID!
    title: String!
    imgSrc: String!
    body: String!
    authorId: ID!
    author: User
    createdAt: String
  }

  type Query {
    getBlogs(take: Int): [Blog]
    getBlogById(id: ID!): Blog
  }

  type Mutation {
    createBlog(title: String!, body: String!, imgSrc: String!): Blog
    updateBlog(id: ID!, title: String!, body: String!, imgSrc: String!): Blog
  }
`;

const resolver = (prisma) => ({
  Query: {
    getBlogs: async (parent, args) => {
      try {
        const { take } = args;
        const result = await prisma.blog.findMany({
          take,
          include: {
            author: true,
          },
        });
        return result;
      } catch (err) {
        console.log("getBlogs error:", err);
      }
    },
    getBlogById: async (parent, args) => {
      try {
        const { id } = args;
        const result = await prisma.blog.findUnique({
          where: { id },
          include: {
            author: true,
          },
        });
        return result;
      } catch (err) {
        console.log("getBlogById error:", err);
      }
    },
  },
  Mutation: {
    createBlog: async (parent, args, context) => {
      try {
        const { title, body, imgSrc } = args;
        const { user } = context;
        const { id: verifiedUserId, username: verifiedUsername } = user;

        const authorId = verifiedUserId;
        const result = await prisma.blog.create({
          data: {
            title,
            body,
            imgSrc,
            authorId,
          },
        });
        return result;
      } catch (err) {
        console.log("createBlog error:", err);
      }
    },
    updateBlog: async (parent, args) => {
      try {
        const { id, title, body, imgSrc } = args;
        const { user } = context;
        const { id: verifiedUserId, username: verifiedUsername } = user;
        const authorId = verifiedUserId;
        const result = await prisma.blog.update({
          where: {
            id,
            authorId,
          },
          data: {
            title,
            body,
            imgSrc,
          },
        });
        return result;
      } catch (err) {
        console.log("updateBlog error:", err);
      }
    },
  },
});

export default { typeDef, resolver };
