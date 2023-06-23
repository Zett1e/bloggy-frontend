import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { blogApi } from "../api/api";
import BlogCard from "../components/BlogCard";
import { AuthContext } from "../context/authContext";

const Category = () => {
  const { category } = useLocation().state;
  const [blogs, setBlogs] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    (() => {
      blogApi
        .get(`/filter/search?category=${category}`)
        .then((res) => {
          setBlogs(res.data);
        })
        .catch((err) => console.log(err));
    })();
  }, [category]);

  return (
    <div className="p-5">
      <h3 className="text-xl font-semibold mb-5">
        Filter by category " {category} "{" "}
      </h3>
      {blogs.length ? (
        <div className="space-y-5">
          {blogs?.map((blog) => (
            <div key={blog.id}>
              <Link to={user ? `/blogs/${blog.id}` : "/login"} state={{ blog }}>
                <BlogCard blog={blog} />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-10">
          <p>No blog found for this category </p>
        </div>
      )}
    </div>
  );
};

export default Category;
