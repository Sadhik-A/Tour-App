import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, path }) => {
  const decodedTokenJSON = localStorage.getItem("decodedToken");
  const isAuthenticated = !!decodedTokenJSON;
  if (!isAuthenticated ) {
    return <Navigate to="/" />;
  }
  if (isAuthenticated && path === "/") {
    return <Navigate to="/home" />;
  }
  return element;
};
export default PrivateRoute;
