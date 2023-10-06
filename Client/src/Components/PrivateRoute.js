import React from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "./Login/Login";

const PrivateRoute = ({ element }) => {
  const decodedTokenJSON = localStorage.getItem("decodedToken");
  const isAuthenticated = !!decodedTokenJSON;

  // If user is authenticated and trying to access the login page,
  // redirect them to the home page
  if (isAuthenticated && element.type === LoginForm) {
    return <Navigate to="/home" />;
  }

  // Otherwise, allow access to the requested route
  return element;
};

export default PrivateRoute;
