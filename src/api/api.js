import axios from "axios";

export const blogApi = axios.create({
  baseURL: "/api/blogs",
  headers: { "Content-Type": "application/json" },
});

export const userApi = axios.create({
  baseURL: "/api/users",
  headers: { "Content-Type": "application/json" },
});


