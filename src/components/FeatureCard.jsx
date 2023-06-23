import React from "react";
import { Link } from "react-router-dom";

const FeatureCard = ({ blog }) => {
  return (
    <Link to={`/blogs/${blog.id}`} state={{ blog }}>
      <div className="cardimg">
        <h1 className="absolute z-10 text-white text-xl bottom-5 left-2">
          {blog.title}
        </h1>
        <img
          className="w-full"
          src={require("../assets/images/Wallpaper2.jpg")}
          alt="Card"
        />
      </div>
    </Link>
  );
};

export default FeatureCard;
