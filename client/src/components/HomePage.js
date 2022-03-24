import { useQuery } from "@apollo/client";

import BlogHead from "./sub/BlogHead";
import { GET_BLOGS } from "./schemas/blogs";

const HomePage = () => {
  const { loading, data: gqlData } = useQuery(GET_BLOGS);
  const blogsData = gqlData?.getBlogs;

  return (
    <div className="container my-5 overflow-auto">
      <div className="row">
        {loading ? (
          <div>Loading...</div>
        ) : (
          blogsData.map((data, i) => (
            <BlogHead className="col-sm-6 col-lg-4 my-3" {...data} key={i} />
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
