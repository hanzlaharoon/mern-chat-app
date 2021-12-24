import React, { useReducer } from "react";
import { AuthContext } from "../context";

const initialAuth = {
  isLoggedIn: false,
  user: null,
};
const authReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "login":
      return {
        ...state,
        isLoggedIn: payload,
      };
    case "user":
      return {
        ...state,
        user: payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useReducer(authReducer, initialAuth);

  const value = {
    isLoggedIn: auth?.isLoggedIn,
    user: auth?.user,
    setLogin: (value) => setAuth({ type: "login", payload: value }),
    setUser: (value) => setAuth({ type: "user", payload: value }),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};