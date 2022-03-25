import React, { useEffect, useState } from "react";

import BlogHead from "./BlogHead";
import { GET_BLOGS } from "../schemas/blogs";
import { useQuery } from "@apollo/client";

const BlogSuggest = () => {
  const { loading, data: gqlData } = useQuery(GET_BLOGS, {
    variables: { take: 3 },
  });
  const [blogsData, setBlogsData] = useState([]);

  useEffect(() => {
    if (gqlData?.getBlogs) {
      setBlogsData(gqlData.getBlogs);
    }
  }, [gqlData]);

  return (
    <>
      {loading
        ? null
        : blogsData.map((data, i) => (
            <BlogHead className="my-3" key={i} {...data}></BlogHead>
          ))}
    </>
  );
};

export default BlogSuggest;
