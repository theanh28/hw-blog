import { gql } from "@apollo/client";

const GET_BLOGS = gql`
  query GetBlogs($take: Int) {
    getBlogs(take: $take) {
      blogId: id
      title
      imgSrc
      body
      createdAt
      author {
        username
      }
    }
  }
`;

const GET_BLOG_BY_ID = gql`
  query GetBlogById($id: ID!) {
    getBlogById(id: $id) {
      blogId: id
      title
      imgSrc
      body
      createdAt
      author {
        username
      }
    }
  }
`;

const CREATE_BLOG = gql`
  mutation CreateBlog($title: String!, $body: String!, $imgSrc: String!) {
    createBlog(title: $title, body: $body, imgSrc: $imgSrc) {
      blogId: id
      title
      imgSrc
      body
      createdAt
      author {
        username
      }
    }
  }
`;

const UPDATE_BLOG = gql`
  mutation UpdateBlog(
    $id: ID!
    $title: String!
    $body: String!
    $imgSrc: String
  ) {
    updateBlog(id: $id, title: $title, body: $body, imgSrc: $imgSrc) {
      id
      title
      imgSrc
      body
      createdAt
      author {
        username
      }
    }
  }
`;

export { GET_BLOGS, GET_BLOG_BY_ID, CREATE_BLOG, UPDATE_BLOG };
