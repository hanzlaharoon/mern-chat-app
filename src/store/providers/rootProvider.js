import React from "react";
import { AuthProvider } from "../providers";

const providers = [AuthProvider];

export const RootProvider = ({ children }) => {
  providers.forEach((Provider) => {
    if (Array.isArray(Provider)) {
      const [Component, props] = Provider;
      children = <Component {...props}>{children}</Component>;
    } else {
      children = <Provider>{children}</Provider>;
    }
  });
  return children;
};