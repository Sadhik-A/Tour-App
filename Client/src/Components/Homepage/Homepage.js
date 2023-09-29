import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Homepage.css";
import Tourlist from "../Tourlist/Tourlist";
import { useDispatch, useSelector } from "react-redux";
import { getTour, setAlertMessage } from "../../redux/Tourslice";
import SearchBar from "../../Components/SearchBar/SearchBar";

function HomePage() {
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 
  const dispatch = useDispatch();
  const AlertMessage = useSelector((state) => state.Tour.alertmessage);
  const decodedTokenJSON = localStorage.getItem("decodedToken");
  const user = JSON.parse(decodedTokenJSON);

  useEffect(() => {
    dispatch(getTour());
  }, [dispatch, user]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";
  };

  useEffect(() => {
    if (AlertMessage) {
      setIsAlertVisible(true);
      setTimeout(() => {
        setIsAlertVisible(false);
        dispatch(setAlertMessage(""));
      }, 3000);
    }
  }, [AlertMessage]);

  const toggleProfile = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleSearch = (term) => {
    setSearchTerm(term); 
  };

  return (
    <>
      <div className="container-nav">
        <h1>Welcome to tour page</h1>
        <div className="top-center">
          <Link
            to="/addTour"
            className="add-tour-button"
            whileHover={{ scale: 1.1 }}
          >
            Add Tour
          </Link>
        </div>
        <SearchBar onSearch={handleSearch} />{" "}
        <div className="avatar-container">
          <i className="fa fa-user-circle fa-3x" onClick={toggleProfile}></i>
          {isDropdownVisible && (
            <motion.div
              className="dropdown"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {user ? (
                <>
                  <p>{user.email}</p>
                  <Link
                    to="/"
                    className="add-tour-button"
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </motion.div>
          )}
        </div>
      </div>
      <div>
        {AlertMessage && isAlertVisible && (
          <div className="tour-alert">
            <motion.p
              className={`alert ${
                AlertMessage === "Tour deleted successfully"
                  ? "success"
                  : "error"
              }`}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              {AlertMessage}
            </motion.p>
          </div>
        )}
        <Tourlist searchTerm={searchTerm} /> 
      </div>
    </>
  );
}

export default HomePage;
