import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import { useLocation } from "react-router-dom";
import {
  getTour,
  deleteTour,
  // likeTour,
  // dislikeTour,
} from "../../redux/Tourslice";
import "./Tourlist.scss";
import ImageViewer from "../ImageViewer/ImageViewer";
import { motion } from "framer-motion";
import Location from "../../assets/Location.svg";
import circle from "../../assets/Ellipse3.svg";
import Download from "../../assets/Download.svg";
import profile from "../../assets/profile.svg";
import Like from "../../assets/like.svg";
import Delete from "../../assets/Delete.svg";
import Edit from "../../assets/Edit.svg";
import Gallery1 from "../../assets/Galleryblue.svg";
import Bluecircle from "../../assets/Bluecircle.svg";
function Tourlist() {
  const searchTerm = useSelector((state) => state.Tour.searchterm)
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const tours = useSelector((state) => state.Tour.tours);
  const mytour = useSelector((state) => state.Tour.mytour);
  // console.log(tours);
  const likes = useSelector((state) => state.Tour.likes);
  const decodedTokenJSON = localStorage.getItem("decodedToken");
  const user = JSON.parse(decodedTokenJSON);
  // console.log(user)
  const uid = user.userId;
  const [selectedImage, setSelectedImage] = useState(null);
  const [tourToDelete, setTourToDelete] = useState(null);
  const [deletetour, setDeleteTour] = useState(false);
  const [show, setShow] = useState(false);
  const handleShow = (tourId) => {
    setShow(true);
    handleDelete(tourId);
  };
  // console.log(tours)
  // console.log(uid);
  // console.log(tours.Userid)
  //  console.log(mytour)
  let filteredTours = tours;
  filteredTours =
    location.pathname === "/profile"
      ? tours.filter((tour) => tour.Userid === uid)
      : tours;

  useEffect(() => {
    dispatch(getTour());
  }, [dispatch, searchTerm, likes, mytour]);
  // useEffect(() => {
  //   {
  //     dispatch(removesearchterm());
  //   }
  // })
  // console.log(deletetour)
  useEffect(() => {
    if (deletetour) {
      dispatch(deleteTour(tourToDelete));

      setDeleteTour(false);
      setTourToDelete(null);
    }
  }, [deletetour, dispatch, tourToDelete]);
  const handleDelete = (tourId) => {
    setTourToDelete(tourId);
  };
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };
  // const handleLike = (tourId) => {
  //   console.log("like is clicked");

  //   dispatch(likeTour(tourId));
  // };

  // const handledisLike = (tourId) => {
  //   console.log("dislike is clicked");

  //   dispatch(dislikeTour(tourId));
  // };

  // Filter tours based on the search term
  const filteredAndSearchedTours = mytour
    ? filteredTours
    : searchTerm
      ? filteredTours.filter((tour) =>
        tour.Tourname.toLowerCase().includes(searchTerm.toLowerCase())
      )
      : filteredTours;
  return (
    <motion.div
      className="tour-list"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {selectedImage && (
        <ImageViewer
          imageUrl={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
      {location.pathname === "/profile"?
        < div className="tour-image1">
      <div className="addnew-tour" onClick={() => navigate("/addTour")}>
        <img src={Bluecircle} alt="circle" className="add-icon" />
        <img src={Gallery1} alt="circle" className="add-gallery" />
        <p className="add-text"> Submit your next photo</p>
          </div>
      </div>:null}
      {filteredAndSearchedTours.map((tour) => (
        <div key={tour.id} className="tour-items">
          <div className="tour-item" whileHover={{ scale: 1.1 }}>
            <div className="tour-title">
              <img src={Location} alt="circle" className="navigation-icon" />
              <h2>{tour.Tourname}</h2>
            </div>
            <div className="tour-image">
              <img
                src={tour.Tourimage}
                alt={tour.Tourname}
                onClick={() => handleImageClick(tour.Tourimage)}
              />
              <motion.div
                className="tour-details"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="download-div">
                  <div className="download-icon">
                    <img src={circle} alt="circle" className="circle" />
                    <img
                      src={location.pathname === "/profile" ? Delete : Download}
                      alt="circle"
                      className="download"
                      onClick={
                        location.pathname === "/profile"
                          ? () => handleShow(tour.id)
                          : null
                      }
                    />
                  </div>
                </div>
                <div className="description">
                  <div className="user">
                    <div className="user-details">
                      <img src={profile} alt="circle" className="circle1" />
                      <div className="user-name">{user.username}</div>
                    </div>
                    <div className="tour-description">
                      <p>{tour.TourDescription}</p>
                    </div>
                  </div>
                  <div className="download-icon">
                    <img src={circle} alt="circle" className="circle" />
                    <img
                      src={location.pathname === "/profile" ? Edit : Like}
                      alt="circle"
                      className="download"
                      onClick={
                        location.pathname === "/profile"
                          ? () => navigate(`/editTour/${tour.id}`)
                          : null
                      }
                    />
                    {/* <p> {tour.likes}</p> */}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* <p>{tour.TourDescription}</p>
            <div className="tour-icons">
              <div className="edit-like">
                {tour.Userid === uid || user.is_admin === 1 ? (
                  <Link to={`/editTour/${tour.id}`}>
                    <i className="fa fa-edit edit-icon"> Edit</i>
                  </Link>
                ) : null}

                <i
                  className="fa fa-thumbs-up like-icon"
                  onClick={() => handleLike(tour.id)}
                >
                  {tour.likes}
                </i>
                <i
                  className="fa fa-thumbs-down dislike-icon"
                  onClick={() => handledisLike(tour.id)}
                >
                  {""}
                </i>
              </div>
              {tour.Userid === uid || user.is_admin === 1 ? (
                <i
                  className="fa fa-trash delete-icon"
                  onClick={() => handleShow(tour.id)}
                >
                  {" "}
                  Delete
                </i>
              ) : null}
            </div> */}
          </div>
        </div>
      ))}

      <ConfirmDialog
        title="Confirm Delete"
        subtitle="Are you sure you want to delete this tour?"
        setDeleteTour={setDeleteTour}
        show={show}
        setShow={setShow}
      />
    </motion.div>
  );
}
export default Tourlist;
