import React, { useState } from "react";
import "./Searchbar.scss";
import { setsearchterm } from "../../redux/Tourslice";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
function SearchBar() {

  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  //  const mytour = useSelector((state) => state.Tour.mytour);
  const dispatch = useDispatch();
  const handleSearch = () => {
    dispatch(setsearchterm(searchTerm));
    // dispatch(setsearchterm(""));
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
          <label for="label" class="btn">
            <i className="fas fa-search" onClick={handleSearch}></i>
          </label>
        </div>
      </div>
    </>

    // <div className="search-bar">
    //   <input
    //     type="text"
    //     placeholder="Search..."
    //     value= { searchTerm}
    //     onChange={(e) => setSearchTerm(e.target.value)}
    //   />
    //   <button onClick={handleSearch}>Search</button>
    // </div>
  );
}
export default SearchBar;
