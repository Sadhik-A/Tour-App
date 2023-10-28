import React, { useEffect, useState } from "react";
import { GoogleLogin } from "../../redux/Userslice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Redirect() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(GoogleLogin());
      setIsLoading(false);
    };

    fetchData();
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (user) {
    navigate("/landing");
    return null; // No need to render anything, as the user will be redirected
  }

  navigate("/");
  return null; // No need to render anything if user is not available

  // You can optionally render something here if needed.
}

export default Redirect;
