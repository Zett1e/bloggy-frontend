import React, { createContext, useEffect } from "react";
import { useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [alert,setAlert] = useState(false)
  const [deleted,setDeleted] = useState(false)

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user"));

    if (token) {
      setUser(token);
    }
  }, []);

  console.log(user);

  return (
    <AuthContext.Provider value={{ user, setUser, alert,setAlert,deleted,setDeleted }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
