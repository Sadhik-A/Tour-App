import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import BrightCircle from "../../assets/Ellipse1.svg";
import DullCircle from "../../assets/Ellipse2.svg";
import Background1 from "../../assets/Background1.png";
import Background2 from "../../assets/Background2.jpg";
import Background3 from "../../assets/Background3.png";
import Background4 from "../../assets/Background4.png";
import profile from "../../assets/profile.svg";
import Gallery from "../../assets/gallery.svg";
import Arrow from "../../assets/arrow.svg";
import "./LandingPage.scss";
import { useNavigate } from "react-router-dom";
import { motion, } from "framer-motion";
import SearchBar from "../../Components/SearchBar/SearchBar";
 const decodedTokenJSON = localStorage.getItem("decodedToken");
const user = JSON.parse(decodedTokenJSON);
function LandingPage() {
  // console.log(user);
   const SearchTerm = useSelector((state) => state.Tour.searchterm);
  const [imageIndex, setImageIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState("image-1");
   const images = [
     Background1,Background2,Background3,Background4
   ];
  useEffect(() => {
    if(SearchTerm) {
     navigate("/home");
    }
  })
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
       setCurrentImage(`image-${(imageIndex + 1) % images.length}`);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length, imageIndex]);
  const backgroundImage = images[imageIndex];
  const navigate = useNavigate();


  return (
    <div
      className={`landing-page ${currentImage}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="main-content">
        <div className="nav-bar">
          <div className="nav-items">
            <h2 className="landing-title">Holidays</h2>
            {/* <p className="nav-title" onClick={() => navigate("/home")}>
            Home
          </p> */}
            <p className="nav-title" onClick={() => navigate("/addTour")}>
              Submit
            </p>
            <p className="nav-title" onClick={() => navigate("/home")}>
              Explore
            </p>
          </div>
          <SearchBar />
          <div className="profile-section">
            <p>Hey  { user.username!==""? user.username : 'User'}  </p>
            <img src={profile} alt="circle" className="circle" onClick={()=>navigate('/profile')}/>
          </div>
        </div>

        <div className="Timelines">
          <div className="Timeline">
            <p
              className={
                imageIndex === 0 ? "Timeline-title-active" : "Timeline-title"
              }
            >
              Kerala
            </p>
            <div className="Timeline-image">
              <img
                src={imageIndex === 0 ? BrightCircle : DullCircle}
                alt="arrow"
                className="arrow"
              />
              <p className={imageIndex === 0 ? "Timeline-number-active" : "Timeline-number"}>1</p>
            </div>
          </div>
          <div className="Timeline-line"></div>
          <div className="Timeline">
            <p
              className={
                imageIndex === 0 ? "Timeline-title-active" : "Timeline-title"
              }
            >
              Delhi
            </p>
            <div className="Timeline-image">
              <img
                src={imageIndex === 1 ? BrightCircle : DullCircle}
                alt="arrow"
                className="arrow"
              />
              <p className={imageIndex === 1 ? "Timeline-number-active" : "Timeline-number"}>2</p>
            </div>
          </div>
          <div className="Timeline-line"></div>
          <div className="Timeline">
            <p
              className={
                imageIndex === 2 ? "Timeline-title-active" : "Timeline-title"
              }
            >
              Rajasthan
            </p>
            <div className="Timeline-image">
              <img
                src={imageIndex === 2 ? BrightCircle : DullCircle}
                alt="arrow"
                className="arrow"
              />
              <p className={imageIndex === 2 ? "Timeline-number-active" : "Timeline-number"}>3</p>
            </div>
          </div>
          <div className="Timeline-line"></div>
          <div className="Timeline">
            <p
              className={
                imageIndex === 3 ? "Timeline-title-active" : "Timeline-title"
              }
            >
              Shimla
            </p>
            <div className="Timeline-image">
            <img
              src={imageIndex === 3 ? BrightCircle : DullCircle}
              alt="arrow"
              className="arrow"
              />
              <p className={imageIndex === 3 ? "Timeline-number-active" : "Timeline-number"}>4</p>
            </div>
          </div>
        </div>
      </div>
      <div className=" Description">
        <div className="Description-titles">
          <p className="Description-title1">
            Travel in Pictures, <br></br>Explore the World Through Photos
          </p>
          <p className="Description-title2">
            Capturing the Beauty, Culture, and Wonders of Global Destinations
          </p>
        </div>
        <div className="Description-buttons">
          <motion.div
            whileHover={{ scale: 1.1 }}
            onHoverStart={(e) => {}}
            onHoverEnd={(e) => {}}
            className="Description-button"
          >
            <img src={Gallery} alt="circle" className="circle" />
            <p className="nav-title" onClick={() => navigate("/addTour")}>
              Submit your photos
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            onHoverStart={(e) => {}}
            onHoverEnd={(e) => {}}
            className="Description-button"
          >
            <img src={Arrow} alt="circle" className="circle" />
            <p className="nav-title" onClick={() => navigate("/home")}>
              Explore photos{" "}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
export default LandingPage;
