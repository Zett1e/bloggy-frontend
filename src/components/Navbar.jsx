import React, { useContext, useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { Alert } from "@mui/material";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser, alert, deleted } = useContext(AuthContext);
  const [isDrop, setIsDrop] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="bg-[#ffd819] relative">
      <Alert
        className={`absolute right-0 top-0 z-10 ${alert ? "" : "!hidden"}`}
        severity="error"
      >
        You can only edit and delete your own blog!
      </Alert>
      <Alert
        className={`absolute right-0 top-0 z-10 ${deleted ? "" : "!hidden"}`}
        severity="success"
      >
        Successfully Deleted!
      </Alert>
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
          <Link to={user ? "/create" : "/login"}>
            <div className="flex items-center gap-x-1 cursor-pointer">
              <PencilSquareIcon className="w-6" />
              <span>Write</span>
            </div>
          </Link>

          {user ? (
            <div
              onClick={() => setIsDrop((prev) => !prev)}
              className="relative flex items-center gap-x-2 cursor-pointer"
            >
              <img
                className="w-10 rounded-full "
                src={require(`../assets/images/avatar${
                  user.id / 2 ? 1 : 2
                }.png`)}
                alt="avatar"
              />
              <p className="font-semibold "> {user.name} </p>
              <div
                onClick={logoutHandler}
                className={`profile cursor-pointer hover:bg-black ${
                  isDrop ? "" : "hidden"
                }`}
              >
                Logout
              </div>
            </div>
          ) : (
            <Link to={"/login"}>
              <p className="font-semibold ">Login</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
