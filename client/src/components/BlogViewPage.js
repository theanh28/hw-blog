import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_BLOG_BY_ID } from "./schemas/blogs";

import BlogSuggest from "./sub/BlogSuggest";

const BlogViewPage = () => {
  const { blogId } = useParams();
  const { loading, data: gqlData } = useQuery(GET_BLOG_BY_ID, {
    variables: { id: blogId },
  });
  const [blogData, setBlogData] = useState({});

  useEffect(() => {
    if (gqlData?.getBlogById) {
      setBlogData(gqlData.getBlogById);
    }
  }, [loading]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="container-fluid bg-1">
          <div className="container">
            <div className="row">
              <div
                className="col-12 text-white text-center border-bottom border-primary"
                style={{ zIndex: 1 }}
              >
                <h1 className="blog-title">{blogData.title}</h1>
              </div>
            </div>

            <div
              className="blog-bg-image"
              style={{
                backgroundImage: `url(${blogData.imgSrc})`,
              }}
            ></div>
            <div className="row justify-content-around blog-scale-bg bg-5 rounded">
              <div className="col-sm-7 blog-paper py-4">
                <p>{blogData.body}</p>
              </div>
              <div className="col-sm-3">
                <BlogSuggest />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogViewPage;
