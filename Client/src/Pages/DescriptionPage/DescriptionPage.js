import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import profile from "../../assets/profile.svg";
import { useNavigate } from "react-router-dom";
import './DescriptionPage.scss';
import circle from "../../assets/Description-circle.svg";
import Heart from "../../assets/Heart.svg";
import RedHeart from "../../assets/RedHeart.svg";
import DownloadDark from "../../assets/DownloadDark.svg";
import Share from "../../assets/Share.svg";
import Bookmark from "../../assets/bookmark.svg";
function DescriptionPage() {
    const [liked, setLiked] = useState(false);
    const navigate = useNavigate();
  const location = useLocation();
    const TourId = location.pathname.split("/").pop();
    const tours = useSelector((state) => state.Tour.tours);
  // console.log(tours);
  const decodedTokenJSON = localStorage.getItem("decodedToken");
    const user = JSON.parse(decodedTokenJSON);
    console.log(user)
  const Username = user.username;

  const [selectedTour, setSelectedTour] = useState(null);

  useEffect(() => {
        const MyTour = tours.find((tour) => tour.id === Number(TourId));
        setSelectedTour(MyTour);
  }, [tours, TourId]);
  console.log(selectedTour);

    return (
      <>
        <div className="main-contents">
          <div className="image-header">
            <div className="profile">
              <div className="profile-image">
                {" "}
                <img
                  src={profile}
                  alt="circle"
                  className="circle"
                  onClick={() => navigate("/profile")}
                />
              </div>
              <div className="profile-name">
                <p> {Username}</p>
              </div>
            </div>
            <div className="image">
              <img src={selectedTour?.Tourimage} alt="tourimage"/>
            </div>
            <div className="icons">
              <div className="download-icon">
                <img src={circle} alt="circle" className="circle" />
                <img src={ liked ? RedHeart : Heart} alt="circle" className="download"  onClick={() =>setLiked(!liked) }/>
              </div>
              <div className="download-icon">
                <img src={circle} alt="circle" className="circle" />
                <img src={DownloadDark} alt="circle" className="download" />
              </div>
              <div className="download-icon">
                <img src={circle} alt="circle" className="circle" />
                <img src={Share} alt="circle" className="download" />
              </div>
              <div className="download-icon">
                <img src={circle} alt="circle" className="circle" />
                <img src={Bookmark} alt="circle" className="download" />
              </div>
            </div>
                </div>
                <div className="description">
                    <div className="title"> {selectedTour?.Tourname}</div>
                    <div className="description-text"> {selectedTour?.TourDescription}</div>
                </div>
        </div>
      </>
    );
}

export default DescriptionPage;
