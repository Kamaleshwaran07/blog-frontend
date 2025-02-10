import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const myContext = createContext();

const baseurl = "https://blog-backend-mnpn.onrender.com";
export const ContextValueProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );

  const login = async (values) => {
    const response = await axios.post(`${baseurl}/api/auth/login`, values, {
      withCredentials: true,
    });

    setCurrentUser(response.data);
  };
  const logout = async () => {
    const res = await axios.post(
      `${baseurl}/api/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    setCurrentUser(null);
  };
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <myContext.Provider value={{ currentUser, login, logout, baseurl }}>
      {children}
    </myContext.Provider>
  );
};
