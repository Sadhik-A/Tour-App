import React, { useEffect, useState } from "react";
import { GoogleLogin } from "../../redux/Userslice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Redirect() {
  const navigate = useNavigate();
    const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GoogleLogin());
    navigate("/landing");
  }, [dispatch,navigate]); 
}

export default Redirect;
