import { gql } from "apollo-server";

const typeDef = gql`
  type Blog {
    id: ID!
    title: String
    imgSrc: String
    body: String
    createdAt: String
  }

  type Query {
    getBlogs(take: Int): [Blog]
    getBlogById(id: ID!): Blog
  }

  type Mutation {
    createBlog(title: String!, body: String!, imgSrc: String): Blog
    updateBlog(id: ID!, title: String!, body: String!, imgSrc: String): Blog
  }
`;

const resolver = (prisma) => ({
  Query: {
    getBlogs: (_, args) => {
      const { take } = args;
      return prisma.blogs.findMany({ take });
    },
    getBlogById: (_, args) => {
      const { id } = args;
      return prisma.blogs.findUnique({
        where: { id },
      });
    },
  },
  Mutation: {
    createBlog: (_, args) => {
      const { title, body, imgSrc } = args;
      return prisma.blogs.create({
        data: {
          title,
          body,
          imgSrc,
        },
      });
    },
    updateBlog: (_, args) => {
      const { id, title, body, imgSrc } = args;
      return prisma.blogs.update({
        where: {
          id,
        },
        data: {
          title,
          body,
          imgSrc,
        },
      });
    },
  },
});

module.exports = { typeDef, resolver };
