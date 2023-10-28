import React, { useEffect } from 'react';
import { GoogleLogin } from '../../redux/Userslice';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";


function Redirect() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GoogleLogin());
    navigate("/landing");
  }, [dispatch,navigate]); // Empty dependency array to run the effect once

  
  return (
    <div>Redirect</div>
  );
}

export default Redirect;
