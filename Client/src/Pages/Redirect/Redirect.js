import React , { useEffect } from 'react';
import { GoogleLogin } from '../../redux/Userslice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";


function Redirect() {
  const user = useSelector((state) => state.user);
  console.log(user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GoogleLogin());
    if (user) {
      navigate("/landing");
    }
    else {
      navigate("/");
    }
  }, [dispatch,navigate,user]); // Empty dependency array to run the effect once


  return (
    <div>Redirect</div>
  );
}

export default Redirect;
