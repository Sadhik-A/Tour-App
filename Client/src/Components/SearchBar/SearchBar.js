import React, { useState } from "react";
import "./Searchbar.scss";
import { setsearchterm } from "../../redux/Tourslice";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
function SearchBar() {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const handleSearch = () => {
    dispatch(setsearchterm(searchTerm));
  };
  return (
    <>
      <div className="box">
        <input type="checkbox" name="tag" id="label" />
        <div
          className={`searchbox ${
            location.pathname === "/home" ||
            location.pathname === "/landing" ||
            location.pathname === "/profile" ||
            location.pathname === "/addTour" ||
            location.pathname === "/editTour/:tourid"
              ? "expanded1"
              : "expanded"
          } ${searchTerm ? "expanded" : ""}`}
        >
          <input
            type="text"
            placeholder="Search...."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <label htmlFor="label" className="btn">
            <i className="fas fa-search" onClick={handleSearch}></i>
          </label>
        </div>
      </div>
    </>
  );
}
export default SearchBar;
