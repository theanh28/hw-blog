import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const BlogHead = ({ title, body, imgSrc, blogId, className }) => {
  const navigate = useNavigate();
  const blogRef = useRef();

  return (
    <div className={`${className}`}>
      <div
        ref={blogRef}
        className="card pb-3"
        onClick={() => navigate(`/blog-view/${blogId}`)}
        style={{ cursor: "pointer", height: 500 }}
      >
        <img
          className="card-img-top"
          style={{ objectFit: "cover", maxHeight: "300px" }}
          src={imgSrc || "https://picsum.photos/1000/1000"}
        ></img>
        <div className="card-body overflow-hidden">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{body}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogHead;
