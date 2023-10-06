import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, path }) => {
  const decodedTokenJSON = localStorage.getItem("decodedToken");
  const isAuthenticated = !!decodedTokenJSON;

  // if user is not authenticated, redirect to login
  if (!isAuthenticated && path !== "/") {
    return <Navigate to="/" />;
  }
  //if user is authenticated,
  if (isAuthenticated && path === "/") {
    return <Navigate to="/home" />;
  }
  return element;
};
export default PrivateRoute;