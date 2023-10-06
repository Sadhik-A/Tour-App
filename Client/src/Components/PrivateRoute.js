
import React from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "./Login/Login";

const PrivateRoute = ({ element }) => {
    console.log(element);
  const decodedTokenJSON = localStorage.getItem("decodedToken");
  const isAuthenticated = !!decodedTokenJSON;

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
    return element;
};

export default PrivateRoute;
