import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import BlogCard from "./BlogCard";

const Blogs = ({ blogs }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const categories = [
    "Game",
    "Technology",
    "Bussiness",
    "Animation",
    "Politics",
    "Science",
    "Film",
    "Sport",
    "History",
  ];
  return (
    <div className="md:flex p-5 gap-10">
      <div className="md:w-[70%] ">
        <div className="space-y-5">
          {blogs
            .map((blog) => (
              <div key={blog.id}>
                <Link to={ user ? `/blogs/${blog.id}`: "/login"} state={{ blog }}>
                  <BlogCard blog={blog} />
                </Link>
              </div>
            ))
            .reverse()}
        </div>
      </div>
      <div className="mt-10 gap-5 flex-wrap h-min hidden md:flex md:w-[30%]">
        {categories.map((category, index) => (
          <p
            key={index}
            onClick={() => {
              navigate(`/${category}`, {
                state: { category },
              });
              
            }}
            className="bg-gray-300 rounded-xl px-3 cursor-pointer "
          >
            {category}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
