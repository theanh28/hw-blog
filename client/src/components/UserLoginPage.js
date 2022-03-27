import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { CREATE_USER } from "./schemas/users";
import { urlRegex } from "./helper";

const BlogEditPage = ({ type }) => {
  const { blogId } = useParams();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [formError, setFormError] = useState({});
  const [mutateBlog, { data: mutateData, loading: mutateLoading }] =
    useMutation(CREATE_USER);
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newFormError = {};
    if (!formData.title || formData.title.length < 5)
      newFormError.title = "Blog title is too short";
    if (!formData.body || formData.body.length < 5)
      newFormError.body = "Blog content is too short";

    if (Object.keys(newFormError).length !== 0) {
      setFormError(newFormError);
      return;
    }

    mutateBlog({
      variables: {
        username: formData.title,
        password: formData.body,
      },
    });
  };

  return (
    <div className="container-fluid bg-1">
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
      )
    </div>
  );
};

export default BlogEditPage;
