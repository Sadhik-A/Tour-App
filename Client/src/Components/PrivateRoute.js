import LoginForm from "./Login/Login";
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const decodedTokenJSON = localStorage.getItem("decodedToken");
  const isAuthenticated = !!decodedTokenJSON;
  console.log(element.type)
  if (isAuthenticated && element.type === LoginForm) {
    return <Navigate to="/home" />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return element;
};

export default PrivateRoute;
