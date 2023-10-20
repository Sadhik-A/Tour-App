import { motion } from "framer-motion";
import profile from "../../assets/profile.svg";
import Userscircle from "../../assets/Userscircle.svg";
import BlueCircle from "../../assets/Subtract.svg";
import DarkBlueCircle from "../../assets/DarkSubstract.svg";
import "./AdminDashboard.scss";
import Adminable from "../../Components/AdminTable/AdminTable";
import NavArrow from "../../assets/NavArrow.svg";
import Polygon from "../../assets/Polygon 2.svg";
import { useState } from "react";
import Settings from "../../assets/settings.svg";
import Language from "../../assets/ChangeLanguage.svg";
import Logout from "../../assets/Logout.svg";
import { clearUserData } from "../../redux/Userslice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import '../Profile/ProfilePage.scss'
import "../Homepage/Homepage.scss";
import "../../Components/Header/Header.css";
// import { useSelector } from "react-redux";
// import React, { useEffect, useState } from "react";
function AdminDashboard() {
      const navigate = useNavigate();
      const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("decodedToken");
        document.cookie =
          "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate("/");
        dispatch(clearUserData());
      };
      const dispatch = useDispatch();
  const toggleProfile = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  //   const users = useSelector((state) => state.user.users);
  return (
    <>
      <div className="admin-header">
        <div className="header-contents">
          <p>Holidays</p>
          <div className="profile">
            <div className="profile-section1">
              <img
                src={profile}
                alt="circle"
                className="circle"
                onClick={() => navigate("/profile")}
              />
              <img
                src={NavArrow}
                alt="circle"
                className="circle"
                onClick={toggleProfile}
              />

              {isDropdownVisible && (
                <motion.div
                  className="dropdown"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <img src={Polygon} alt="circle" className="polygon" />
                  <div className="Dropdown-details">
                    <div className="settings">
                      <img src={Settings} alt="circle" className="circle" />
                      <p className="nav-button-title1">Settings</p>
                    </div>
                    <div className="settings">
                      <img src={Language} alt="circle" className="circle" />
                      <p className="nav-button-title1">Change language</p>
                    </div>
                    <div className="settings" onClick={handleLogout}>
                      <img src={Logout} alt="circle" className="circle" />
                      <p className="nav-button-title1">Logout</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="admin-title">Admin dashboard</div>
      <div className="Dashboard-contents">
        <div className="table-outline">
          <div className="table">
            <Adminable />
          </div>
        </div>
        <div className="users-photos">
          <div className="users">
            <div className="users-title">Total Users</div>
            <div className="users-count-image">
              <img
                src={Userscircle}
                alt="circle"
                className="circle"
                // onClick={() => navigate("/profile")}
              />
              <img
                src={BlueCircle}
                alt="bluecircle"
                className="bluecircle"
                // onClick={() => navigate("/profile")}
              />
              <div className="users-count">
                <p className="users-count-number">10k</p>
                <p className="users-count-text">Active Users</p>
              </div>
            </div>
          </div>
          <div className="users">
            <div className="users-title">Uploaded Images</div>
            <div className="users-count-image">
              <img
                src={Userscircle}
                alt="circle"
                className="circle"
                // onClick={() => navigate("/profile")}
              />
              <img
                src={DarkBlueCircle}
                alt="bluecircle"
                className="bluecircle1"
                // onClick={() => navigate("/profile")}
              />
              <div className="users-count1">
                <p className="users-count-number">10k</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
