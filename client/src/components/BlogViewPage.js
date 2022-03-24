import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_BLOG_BY_ID } from "./schemas/blogs";

import BlogSuggest from "./sub/BlogSuggest";

const BlogViewPage = () => {
  const { blogId } = useParams();
  const { loading, data: gqlData } = useQuery(GET_BLOG_BY_ID, {
    variables: { id: blogId },
  });
  const blogData = gqlData?.getBlogById;

  return (
    <>
      {loading ? null : (
        <>
          <div className="container">
            <div className="row sticky-top">
              <div className="col-12 text-center bg-paper border-bottom border-primary">
                <h1 className="display-3">{blogData.title}</h1>
              </div>
            </div>

            <div
              style={{
                backgroundImage: `url(${blogData.imgSrc})`,
                height: "100vh",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            ></div>
            <div className="row justify-content-around bg-white blog-scale-bg">
              <div className="col-sm-7 bg-paper blog-paper blog-paper-shell">
                <p>{blogData.body}</p>
              </div>
              <div className="d-none d-sm-block col-sm-3 bg-paper blog-paper-shell">
                <BlogSuggest />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BlogViewPage;
