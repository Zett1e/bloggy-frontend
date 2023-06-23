import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userApi } from "../api/api";
import { AuthContext } from "../context/authContext";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const registerHandler = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      userApi
        .post("/register", {
          name: username,
          email,
          password,
        })
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
          setUser(res.data);
        })
        .catch((err) => {
          if (
            err.response?.data?.error ===
            "Do not know how to serialize a BigInt"
          ) {
            navigate("/login");
            setError(null);
          } else {
            setError(err.response?.data?.error);
          }
        });
    } else {
      setError("Password doesn't match");
    }
  };

  return (
    <form
      onSubmit={registerHandler}
      className=" flex justify-center items-center h-screen"
    >
      <div className="p-5 space-y-8 bg-yellow-200 rounded w-[40%] flex flex-col justify-center items-center ">
        <h1 className="text-2xl font-semibold uppercase tracking-wider">
          Sign Up
        </h1>
        <TextField
          className=""
          id="outlined-basic"
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
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
          type="password"
          className=""
          id="outlined-basic"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <TextField
          type="password"
          className=""
          id="outlined-basic"
          label="Confirm Password"
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />

        {error && <p className="!mt-2 text-red-600 rounded">{error}</p>}

        <p className="text-sm !mt-3">
          Already have an account?{" "}
          <Link to={"/login"} className="font-semibold">
            Login
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

export default Register;
