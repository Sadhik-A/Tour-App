import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, path }) => {
  const decodedTokenJSON = localStorage.getItem("decodedToken");
  // console.log(decodedTokenJSON)
const isGoogleAuthenticated = document.cookie
  .split(";")
  .some((item) => item.trim().startsWith("session="));
  console.log(isGoogleAuthenticated)
  const isAuthenticated = !!decodedTokenJSON||!!isGoogleAuthenticated;
 
  const user=JSON.parse(decodedTokenJSON);

  // if user is not authenticated, redirect to login
  if (!isAuthenticated && path !== "/") {
    return <Navigate to="/" />;
  }
  //if user is authenticated,
  if (isAuthenticated && user.is_admin === 1 && path === "/") {
    return <Navigate to="/admin" />;
  }
  if (isAuthenticated && user.is_admin === 0  && path === "/") {
    return <Navigate to="/landing" />;
  }
  return element;
};
export default PrivateRoute;