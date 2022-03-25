import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { CREATE_BLOG, GET_BLOG_BY_ID, UPDATE_BLOG } from "./schemas/blogs";
import { urlRegex } from "./helper";

const BlogEditPage = ({ type }) => {
  const { blogId } = useParams();
  const [formData, setFormData] = useState({ title: "", imgSrc: "", body: "" });
  const [formError, setFormError] = useState({});
  const [mutateBlog, { data: mutateData, loading: mutateLoading }] =
    useMutation(type == "edit" ? UPDATE_BLOG : CREATE_BLOG);
  const { loading: queryLoading, data: queryData } = useQuery(GET_BLOG_BY_ID, {
    variables: {
      id: blogId,
    },
  });
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newFormError = {};
    if (!formData.title || formData.title.length < 5)
      newFormError.title = "Blog title is too short";
    if (!urlRegex.test(formData.imgSrc)) newFormError.imgSrc = "Invalid url";
    if (!formData.body || formData.body.length < 5)
      newFormError.body = "Blog content is too short";

    if (Object.keys(newFormError).length !== 0) {
      setFormError(newFormError);
      return;
    }

    mutateBlog({
      variables: {
        id: blogId,
        title: formData.title,
        imgSrc: formData.imgSrc,
        body: formData.body,
      },
    });
  };

  useEffect(() => {
    if (!mutateLoading && mutateData) {
      // Submit complete
      if (!blogId) {
        // case create blog we don't have blogId
        blogId = mutateData.createBlog.blogId;
      }
      navigate(`/blog-view/${blogId}`);
    }
  }, [mutateLoading]);

  useEffect(() => {
    if (!queryLoading) {
      if (queryData) {
        // update case, has id
        const { title, imgSrc, body } = queryData.getBlogById;
        setFormData({ title, imgSrc, body });
      }
      // else create case
    }
  }, [queryLoading]);

  return (
    <div className="container-fluid bg-1">
      {mutateLoading ? (
        "Submitting..."
      ) : queryLoading ? (
        "Querying data..."
      ) : (
        <div className="form-group">
          <div className="container bg-5 my-5 rounded py-3">
            <label>Blog Title</label>
            <textarea
              className="form-control"
              placeholder="Aa"
              rows={2}
              style={{ resize: "none" }}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
              }}
              value={formData.title}
            ></textarea>
            <div className="text-danger">{formError.title}</div>

            <label>Thumbnail URL</label>
            <textarea
              className="form-control"
              placeholder="https://"
              type="text"
              rows={1}
              style={{ resize: "none" }}
              onChange={(e) => {
                setFormData({ ...formData, imgSrc: e.target.value });
              }}
              value={formData.imgSrc}
            ></textarea>
            <div className="text-danger">{formError.imgSrc}</div>

            <label>Blog Content</label>
            <textarea
              className="form-control"
              placeholder="Aa"
              rows={20}
              style={{ resize: "none" }}
              onChange={(e) => {
                setFormData({ ...formData, body: e.target.value });
              }}
              value={formData.body}
            ></textarea>
            <div className="text-danger">{formError.body}</div>
            <div className="mt-3 d-flex justify-content-between">
              <button
                className="btn btn-primary"
                type="submit"
                onClick={handleFormSubmit}
              >
                Submit
              </button>
              <button className="btn btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogEditPage;
