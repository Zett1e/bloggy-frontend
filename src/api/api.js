import axios from "axios";

export const api = axios.create({
  baseURL: "/api/blogs",
  headers: { "Content-Type": "application/json" },
});


