import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const FeatureCard = ({ blog }) => {
  const { user } = useContext(AuthContext);
  return (
    <Link to={user ? `/blogs/${blog.id}` : "/login"} state={{ blog }}>
      <div className="cardimg w-[440px] h-[249px]">
        <h1 className="absolute z-10 text-white text-xl bottom-5 left-2">
          {blog.title}
        </h1>
        {blog.imageUrl && (
          <img
            className="w-full object-cover"
            src={blog.imageUrl}
            alt="Card"
          />
        )}
      </div>
    </Link>
  );
};

export default FeatureCard;
