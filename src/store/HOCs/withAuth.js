import React, { useContext } from "react";
import { AuthContext } from "../context";

export const withAuth = (Component) => {
  const AuthConsumer = (props) => {
    const context = useContext(AuthContext);
    return <Component {...props} {...context} />;
  };
  return AuthConsumer;
};