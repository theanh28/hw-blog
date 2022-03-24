import { gql } from "@apollo/client";

const GET_BLOGS = gql`
  query ($take: Int){
    getBlogs(take: $take) {
      blogId: id
      title
      imgSrc
      body
      createdAt
    }
  }
`;

const GET_BLOG_BY_ID = gql`
  query ($id: ID!) {
    getBlogById(id: $id) {
      blogId: id
      title
      imgSrc
      body
      createdAt
    }
  }
`;

export { GET_BLOGS, GET_BLOG_BY_ID };
