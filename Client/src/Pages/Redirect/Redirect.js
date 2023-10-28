import React , { useEffect } from 'react';
import { GoogleLogin } from '../../redux/Userslice';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";


function Redirect() {
  const user = useSelector((state) => state.user);
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
  }, [dispatch,navigate]); // Empty dependency array to run the effect once


  return (
    <div>Redirect</div>
  );
}

export default Redirect;
