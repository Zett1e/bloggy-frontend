import React from "react";
import { Route, Routes } from "react-router-dom";
import BlogDetail from "../pages/BlogDetail";
import BlogForm from "../pages/BlogForm";
import Category from "../pages/Category";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blogs/:id" element={<BlogDetail />} />
      <Route path="/create" element={<BlogForm />} />
      <Route path="/edit" element={<BlogForm />} />
      <Route path="/:category" element={<Category />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
