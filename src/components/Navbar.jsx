import React from "react";
import {
  PencilSquareIcon,
  MagnifyingGlassIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#ffd819]">
      <div className="py-3 px-5 md:px-10 flex justify-between items-center">
        <div
          onClick={() => navigate("/")}
          className="w-24 md:w-32 cursor-pointer"
        >
          <img
            className="w-full"
            src={require("../assets/images/Bloggy_Logo.png")}
            alt="Logo"
          />
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <MagnifyingGlassIcon className="w-6 cursor-pointer" />
          <Link to={'/create'} >
            <div className="flex items-center gap-x-1 cursor-pointer">
              <PencilSquareIcon className="w-6" />
              <span>Write</span>
            </div>
          </Link>
          <BellIcon className="w-6 cursor-pointer" />
          <img
            className="w-10 rounded-full cursor-pointer"
            src={require("../assets/images/avatar.jpg")}
            alt="avatar"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
