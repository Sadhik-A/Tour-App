import React from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "./Login/Login";
const PrivateRoute = ({ element }) => {
  const decodedTokenJSON = localStorage.getItem("decodedToken");
  const isAuthenticated = !!decodedTokenJSON;

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }
    else if(element==LoginForm) {
        return null;
    }
    else {
        return element
    }
};
export default PrivateRoute;
