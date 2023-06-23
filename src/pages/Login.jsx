import { Button, TextField } from "@mui/material";
import React, { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userApi } from "../api/api";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();

    userApi
      .post("/login", {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data);
        setError(null);
        navigate("/");
      })
      .catch((err) => {
        setError(err.response?.data?.error);
      });
  };

  return (
    <form
      onSubmit={loginHandler}
      className=" flex justify-center items-center h-screen -mt-16"
    >
      <div className="p-5 space-y-8 bg-yellow-200 rounded w-[40%] flex flex-col justify-center items-center ">
        <h1 className="text-2xl font-semibold uppercase tracking-wider">
          Login
        </h1>
        <TextField
          className=""
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          className=""
          type="password"
          id="outlined-basic"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        {error && <p className="!mt-2 text-red-600 rounded">{error}</p>}

        <p className="text-sm !mt-3">
          Don't have an account?{" "}
          <Link to={"/register"} className="font-semibold">
            Register
          </Link>
        </p>

        <Button
          type="submit"
          className="!bg-yellow-400 !text-black !block !mx-auto"
          variant="contained"
        >
          Login
        </Button>
      </div>
    </form>
  );
};

export default Login;
