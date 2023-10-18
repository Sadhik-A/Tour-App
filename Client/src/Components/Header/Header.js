import React from 'react'
import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../Components/SearchBar/SearchBar";
// import { clearUserData } from "../../redux/Userslice";
import { useNavigate } from "react-router-dom";
import '../../Pages/Homepage/Homepage';
import '../SearchBar/Searchbar.scss';
import profile from "../../assets/profile.svg";
import NavArrow from "../../assets/NavArrow.svg";
import Filter from "../../assets/Filter.svg";
import '../../Pages/LandingPage/LandingPage.scss';
import './Header.css';
import { removesearchterm } from '../../redux/Tourslice';
// import { setmytour,} from '../../redux/Tourslice';
// import '../Tourlist/Tourlist'
function Header() {
// const decodedTokenJSON = localStorage.getItem("decodedToken");
  // const user = JSON.parse(decodedTokenJSON);
    const tours = useSelector((state) => state.Tour.tours);
  // const [isDropdownVisible, setIsDropdownVisible] = useState(false);
// const mytour = useSelector((state) => state.Tour.mytour);
// const [searchTerm, setSearchTerm] = useState("");
const dispatch = useDispatch();
const navigate = useNavigate();
// const toggleProfile = () => {
//   setIsDropdownVisible(!isDropdownVisible);
// };


// const handleLogout = () => {
//   localStorage.removeItem("authToken");
//   localStorage.removeItem("decodedToken");
//   document.cookie =
//     "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//   navigate("/");
//   dispatch(clearUserData());
// };
  return (
    <>
      <div className="header">
        <div className="main-header">
          <div className="header-search">
            <h1 className="header-title">Tour the World via Captures</h1>
            {/* <div className="top-center">
          <Link
            to="/addTour"
            className="add-tour-button"
            whileHover={{ scale: 1.1 }}
          >
            Add Tour
          </Link>
        </div> */}
            {/* <div className="top-center">
          <button
            className="add-tour-button"
            whileHover={{ scale: 1.1 }}
            onClick={() => {
              if (mytour) {
                dispatch(setmytour(false));
                // setSearchTerm("");
              } else {
                dispatch(setmytour(true));
              }
            }}
          >
            {mytour ? "All Tours" : "My Tours"}
          </button>
        </div> */}
            <SearchBar />
          </div>
          <div className="profile" >
            <img src={profile} alt="circle" className="circle" onClick={() => navigate('/profile')} />
            
            {/* {isDropdownVisible && (
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
                      className="logout-button"
                      onClick={handleLogout}
                    >
                      Logout
                    </Link>
                  </>
                ) : (
                  <p>Loading...</p>
                )}
              </motion.div>
            )} */}
          </div>
        </div>
        <div className="sub-header">
          <div className="sub-headers">
            <div className="sub-header1">
              <div className="nav-button">
                <div className="nav-button-title">
                  Photos <span className="users">{tours.length}</span>
                </div>
              </div>
              <div className="nav-button1">
                <div className="nav-button-title1">
                  Videos <span className="users1">145k</span>
                </div>
              </div>
              <div className="nav-button1">
                <div className="nav-button-title1">
                  Users <span className="users1">145k</span>
                </div>
              </div>
            </div>
            <div className="sub-header2">
              <div className="nav-demo-button">
                <div className="nav-button-title1">
                  <Link to="/home" className="nav-button-title1" onClick={() => dispatch(removesearchterm())}>
                    Explore
                  </Link>
                </div>
                <img src={NavArrow} alt="circle" className="circle" />
              </div>
              <div className="nav-demo-button">
                <div className="nav-button-title1">
                  <Link to="/addTour" className="nav-button-title1">
                    Submit your photos
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="nav-button1">
            <img src={Filter} alt="circle" className="circle" />
            <div className="nav-button-title1">Filter</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;