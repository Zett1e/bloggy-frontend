import { Button, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { api } from "../api/api";
import { useLocation } from "react-router-dom";

const BlogForm = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const path = useLocation().pathname;
  const blog = useLocation().state?.blog;

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

  const createHandler = (e) => {
    e.preventDefault();
    api
      .post("/", { ...newBlog, user_id: 2 })
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
          setError(err.message);
        }
        console.log(err.response.data.error);
      });
  };

  const updateHandler = (e) => {
    e.preventDefault();

    api.put(`/${blog?.id}`,newBlog).then((res) => {
      setSuccess(true);
      setError("");
    })
    .catch((err) => {
      if (
        err.response?.data?.error === "Do not know how to serialize a BigInt"
      ) {
        setSuccess(true);
        setError("");
      } else {
        setError(err.message);
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
          <p className="px-5 py-3 bg-red-300 text-red-600 rounded">
            {error.message}
          </p>
        )}

        {success && (
          <p className="px-5 py-3 bg-green-300 text-green-600 rounded">
            Blog created successfully
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
