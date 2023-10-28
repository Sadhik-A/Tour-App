import React, { useEffect } from "react";
import { GoogleLogin } from "../../redux/Userslice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Redirect() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(GoogleLogin());
      if (user) {
        navigate("/landing");
      } else {
        navigate("/");
      }
    };
    fetchData();
  }, [dispatch, navigate, user]);

  if (user === null) {
    return <div>Loading...</div>;
  }

  return <div>Redirect</div>;
}

export default Redirect;
