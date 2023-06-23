import {
  BookmarkIcon,
  ChatBubbleLeftIcon,
  HandThumbUpIcon,
  ShareIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { formatDistanceToNow } from "date-fns";
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { blogApi } from "../api/api";
import { AuthContext } from "../context/authContext";

const BlogDetail = () => {
  const { blog } = useLocation().state;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [like, setLike] = useState(0);
  const [liked, setLiked] = useState(false);
  const { setAlert, setDeleted } = useContext(AuthContext);

  const deleteHandler = () => {
    if (user.id !== blog.user_id) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    } else {
      blogApi
        .delete(`/${blog.id}`)
        .then((res) => {
          setDeleted(true);
          setTimeout(() => {
            setDeleted(false);
          }, 2000);
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  };

  const editHandler = () => {
    if (user.id !== blog.user_id) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    } else {
      navigate("/edit", { state: { blog } });
    }
  };

  return (
    <div className="p-5">
      <div className="space-y-5">
        <div className="flex items-center gap-5">
          <div className="w-14 rounded-full overflow-hidden">
            <img
              src={require(`../assets/images/avatar${user?.id / 2 ? 1 : 2}.png`)}
              alt="avatar"
            />
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
                  onClick={editHandler}
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
          {blog.imageUrl && (
            <div className="rounded-md overflow-hidden">
              <img src={blog.imageUrl} alt="poster" />
            </div>
          )}
          <article>
            <p>{blog.body}</p>
          </article>
          <div className="flex justify-between">
            <div className="flex gap-10">
              <div className="flex items-center gap-2">
                <HandThumbUpIcon
                  onClick={() => {
                    liked
                      ? setLike((prev) => prev - 1)
                      : setLike((prev) => prev + 1);
                    setLiked((prev) => !prev);
                  }}
                  className={`w-5 cursor-pointer ${liked && "text-yellow-500"}`}
                />
                <p>{like}</p>
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
