import  { useEffect, } from "react";
import { GoogleLogin } from "../../redux/Userslice";
import { useDispatch, } from "react-redux";
// import { useNavigate } from "react-router-dom";

// function Redirect() {
//   const navigate = useNavigate();
//     const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(GoogleLogin());
//     navigate("/landing");
//   }, [dispatch, navigate]); 
//   return <div>redirect</div>;

// }

// export default Redirect;
import React from 'react'

function Redirect() {
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(GoogleLogin());
      console.log("useeffect is running")
      // navigate("/landing");
    },);
  return <div>Redirect</div>;
}

export default Redirect