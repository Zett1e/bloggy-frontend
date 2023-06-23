import React from "react";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { Paper } from "@mui/material";
import { formatDistanceToNow } from "date-fns";

const BlogCard = ({ blog }) => {
  return (
    <div>
      <Paper elevation={1} className="p-3 space-y-3">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-3 ">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={require("../assets/images/avatar.jpg")}
                alt="avatar"
              />
            </div>
            <h5 className="font-semibold"> {blog.name} </h5>
          </div>
          
        </div>
        <div className="flex justify-between">
          <div className="flex-1 md:w-[70%] flex flex-col justify-between">
            <div className="space-y-2">
              <h1 className="text-lg md:text-xl font-semibold">{blog.title}</h1>
              <span className="opacity-70 text-sm">
            {formatDistanceToNow(new Date(blog.created_at), {
              addSuffix: true,
            })}
          </span>
              <p className="hidden md:block w-[90%] text-ellipsis overflow-hidden whitespace-nowrap ">
                {blog.body}
              </p>
            </div>
            <div className="flex items-center gap-10">
              <p className="bg-gray-300 rounded-xl px-3 inline-block">
                {blog.category}
              </p>
              <BookmarkIcon className="w-5 h-6" />
            </div>
          </div>
          <div className="md:w-[25%] w-24 h-24 md:h-auto rounded-sm overflow-hidden">
            <img
              src={require("../assets/images/Wallpaper2.jpg")}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default BlogCard;
