import React, {useState } from 'react'
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch} from "react-redux";
import SearchBar from "../../Components/SearchBar/SearchBar";
import { clearUserData } from "../../redux/Userslice";
import { useNavigate } from "react-router-dom";
import '../../Pages/Homepage/Homepage';
import '../SearchBar/Searchbar.css';
   
function Header({ setSearchTerm}) {
const decodedTokenJSON = localStorage.getItem("decodedToken");
const user = JSON.parse(decodedTokenJSON);
const [isDropdownVisible, setIsDropdownVisible] = useState(false);
// const [searchTerm, setSearchTerm] = useState("");
const dispatch = useDispatch();
const navigate = useNavigate();
const toggleProfile = () => {
  setIsDropdownVisible(!isDropdownVisible);
};

const handleSearch = (term) => {
  setSearchTerm(term);
};

const handleLogout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("decodedToken");
  document.cookie =
    "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  navigate("/");
  dispatch(clearUserData());
};
    return (
    <div className="container-nav">
      <h1>Tour page</h1>
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
                <Link to="/" className="logout-button" onClick={handleLogout}>
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
  );
}

export default Header;