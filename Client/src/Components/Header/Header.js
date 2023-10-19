import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../Components/SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";
import "../../Pages/Homepage/Homepage";
import "../SearchBar/Searchbar.scss";
import profile from "../../assets/profile.svg";
import NavArrow from "../../assets/NavArrow.svg";
import Filter from "../../assets/Filter.svg";
import "../../Pages/LandingPage/LandingPage.scss";
import "./Header.css";
import { removesearchterm } from "../../redux/Tourslice";
function Header() {
  const tours = useSelector((state) => state.Tour.tours);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <div className="header">
        <div className="main-header">
          <div className="header-search">
            <h1 className="header-title">Tour the World via Captures</h1>
            <SearchBar />
          </div>
          <div className="profile">
            <img
              src={profile}
              alt="circle"
              className="circle"
              onClick={() => navigate("/profile")}
            />
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
                  <Link
                    to="/home"
                    className="nav-button-title1"
                    onClick={() => dispatch(removesearchterm())}
                  >
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
