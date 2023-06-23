import { Button, TextField } from "@mui/material";
import React, { useContext } from "react";
import { useState } from "react";
import { blogApi } from "../api/api";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const BlogForm = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const path = useLocation().pathname;
  const blog = useLocation().state?.blog;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()

  const initialCreateState = {
    title: "",
    category: "",
    imageUrl: "",
    body: "",
  };

  const initialEditState = {
    title: blog?.title,
    category: blog?.category,
    imageUrl: blog?.imageUrl,
    body: blog?.body,
  };

  const [newBlog, setNewBlog] = useState(
    path === "/create" ? initialCreateState : initialEditState
  );

  console.log(error);

  const createHandler = (e) => {
    e.preventDefault();
    blogApi
      .post("/", { ...newBlog, user_id: user.id })
      .then((res) => {
        setNewBlog({ title: "", category: "", imageUrl: "", body: "" });
        setSuccess(true);
        setError(null);
      })
      .catch((err) => {
        if (
          err.response?.data?.error === "Do not know how to serialize a BigInt"
        ) {
          setNewBlog({ title: "", category: "", imageUrl: "", body: "" });
          setSuccess(true);
          setError(null);
        } else {
          setError(err.response.data.error);
        }
        console.log(err.response.data.error);
      });
  };

  const updateHandler = (e) => {
    e.preventDefault();

    blogApi.put(`/${blog?.id}`,newBlog).then((res) => {
      setSuccess(true);
      setError(null);
    })
    .catch((err) => {
      if (
        err.response?.data?.error === "Do not know how to serialize a BigInt"
      ) {
        setSuccess(true);
        setError(null);
        setTimeout(() => {
          navigate('/')
        }, 500);
      } else {
        setError(err.response.data.error);
      }
      console.log(err.response.data.error);
    });
  };

  return (
    <form onSubmit={path === "/create" ? createHandler : updateHandler}>
      <div className="p-5 space-y-3">
        <TextField
          className="w-full"
          id="outlined-basic"
          label="Title"
          variant="outlined"
          value={newBlog.title}
          onChange={(e) => {
            setNewBlog((prev) => ({ ...prev, title: e.target.value }));
          }}
        />
        <TextField
          className="w-full"
          id="outlined-basic"
          label="Category"
          variant="outlined"
          value={newBlog.category}
          onChange={(e) => {
            setNewBlog((prev) => ({ ...prev, category: e.target.value }));
          }}
        />
        <TextField
          className="w-full"
          id="outlined-basic"
          label="Image Url"
          variant="outlined"
          value={newBlog.imageUrl}
          onChange={(e) => {
            setNewBlog((prev) => ({ ...prev, imageUrl: e.target.value }));
          }}
        />
        <TextField
          className="w-full"
          id="outlined-multiline-flexible"
          label="Blog Body"
          multiline
          value={newBlog.body}
          onChange={(e) => {
            setNewBlog((prev) => ({ ...prev, body: e.target.value }));
          }}
        />

        {error && (
          error.message ?
          <p className="px-5 py-3 bg-red-300 text-red-600 rounded">
            {error.message}
          </p>
          :
          <p className="px-5 py-3 bg-red-300 text-red-600 rounded">
            {error}
          </p>
        )}

        {success && (
          <p className="px-5 py-3 bg-green-300 text-green-600 rounded">
            Blog {path === "/create" ? "Created" : "Edited"} successfully
          </p>
        )}

        <Button
          type="submit"
          className="!bg-yellow-400 !text-black !block !ml-auto"
          variant="contained"
        >
          {path === "/create" ? "Create" : "Edit"}
        </Button>
      </div>
    </form>
  );
};

export default BlogForm;
