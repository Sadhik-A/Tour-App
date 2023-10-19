import React, { useEffect, useState} from 'react'
import "../../Pages/LandingPage/LandingPage.scss";
import "../../Components/Header/Header.css";
import { Link } from "react-router-dom";
import NavArrow from "../../assets/NavArrow.svg";
import Notification from "../../assets/Notification.svg";
import profile from "../../assets/profile.svg";
import Polygon from "../../assets/Polygon 2.svg";
import Edit from "../../assets/Edit.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./ProfilePage.scss";
import "../../Components/Header/Header.css"
import Tourlist from "../../Components/Tourlist/Tourlist";
import Settings from "../../assets/settings.svg";
import Language from "../../assets/ChangeLanguage.svg";
import Logout from "../../assets/Logout.svg";
import { motion } from "framer-motion";
import { clearUserData } from "../../redux/Userslice";
import { removesearchterm } from '../../redux/Tourslice';
 const decodedTokenJSON = localStorage.getItem("decodedToken");
 const user = JSON.parse(decodedTokenJSON);
function ProfilePage() {
  useEffect(() => {
    dispatch(removesearchterm());
  })
  const SearchTerm = useSelector((state) => state.Tour.searchterm);
  const navigate = useNavigate();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const toggleProfile = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("decodedToken");
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
    dispatch(clearUserData());
  };
  return (
    <>
      <div className="profile-page">
        <div className="header">
          <div className="main-header">
            <div className="header-search">
              <h1 className="header-title">Tour the World via Captures</h1>
              <div className="sub-header1">
                <div className="nav-demo-button">
                  <div className="nav-button-title1">
                    <Link to="/home" className="nav-button-title1">
                      Explore
                    </Link>
                  </div>
                  <img src={NavArrow} alt="circle" className="circle" />
                </div>
                <div className="nav-demo-button">
                  <div className="nav-button-title1">
                    <Link to="/home" className="nav-button-title1">
                      Licenses
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="profile">
              <div className="profile-section1">
                <img src={Notification} alt="circle" className="circle" />
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
        <div className="profile-section">
          <div className="profile-details">
            <div className="personal-info">
              <div className="profile-image">
                <img
                  src={profile}
                  alt="circle"
                  className="circle"
                  onClick={() => navigate("/profile")}
                />
              </div>
              <div className="profile-name">
                {user.username !== "" ? user.username : "User"}
              </div>
            </div>
          </div>
          <div className="edit-profile">
            <div className="edit-icon">
              <img src={Edit} alt="circle" className="Edit-icon" />
            </div>
            <div className="edit-text">Edit profile</div>
          </div>
          <div className="views-photos">
            <div className="photos-details">
              <div className="photos">
                <p className="nav-button-title1">Your photos</p>
                <p className="photos-count">6</p>
              </div>
            </div>
            <div className="photos-details">
              <div className="photos">
                <p className="nav-button-title1">Total-views</p>
                <p className="photos-count">100</p>
              </div>
            </div>
          </div>
        </div>

        <div className="sub-header3">
          <div className="nav-button1">
            <div className="nav-button-title1">
              Highlights <span className="users1">0</span>
            </div>
          </div>
          <div className="nav-button">
            <div className="nav-button-title">
              Gallery <span className="users">145k</span>
            </div>
          </div>
          <div className="nav-button1">
            <div className="nav-button-title1">
              Collections <span className="users1">145k</span>
            </div>
          </div>
        </div>
        <Tourlist searchTerm={SearchTerm} />
      </div>
    </>
  );
}

export default ProfilePage;