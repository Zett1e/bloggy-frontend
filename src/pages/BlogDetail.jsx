import {
  BookmarkIcon,
  ChatBubbleLeftIcon,
  HandThumbUpIcon,
  ShareIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { formatDistanceToNow } from "date-fns";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../api/api";

const BlogDetail = () => {
  const { blog } = useLocation().state;
  const navigate = useNavigate();

  const deleteHandler = () => {
    api
      .delete(`/${blog.id}`)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-5">
      <div className="space-y-5">
        <div className="flex items-center gap-5">
          <div className="w-14 rounded-full overflow-hidden">
            <img src={require("../assets/images/avatar.jpg")} alt="avatar" />
          </div>
          <div className="w-full">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-5">
                <h3 className="text-lg font-semibold">{blog.name}</h3>
                <p className="bg-green-400 px-3 rounded-xl text-sm">Follow</p>
              </div>
              <div className="flex gap-x-2 md:gap-x-5">
                <BookmarkIcon className="w-5 h-6 cursor-pointer" />
                <PencilIcon
                  onClick={() => navigate("/edit", { state: { blog } })}
                  className="w-5 cursor-pointer"
                />
                <TrashIcon
                  onClick={deleteHandler}
                  className="w-5 cursor-pointer hover:text-red-500"
                />
              </div>
            </div>
            <div>
              <p>
                {formatDistanceToNow(new Date(blog.created_at), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-5">
          <h1 className="text-2xl font-bold">{blog.title}</h1>
          <div className="space-x-3">
            <p className="bg-gray-300 rounded-xl px-3 inline-block">
              {blog.category}
            </p>
          </div>
          <div className="rounded-md overflow-hidden">
            <img
              src={require("../assets/images/Wallpaper2.jpg")}
              alt="poster"
            />
          </div>
          <article>
            <p>{blog.body}</p>
          </article>
          <div className="flex justify-between">
            <div className="flex gap-10">
              <div className="flex items-center gap-2">
                <HandThumbUpIcon className="w-5 cursor-pointer" />
                <p>1k</p>
              </div>
              <div className="flex items-center gap-2">
                <ChatBubbleLeftIcon className="w-5 cursor-pointer" />
                <p>28</p>
              </div>
            </div>
            <div className="mr-5">
              <ShareIcon className="w-5 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
