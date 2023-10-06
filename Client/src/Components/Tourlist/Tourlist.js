import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getTour,
  deleteTour,
  likeTour,
  dislikeTour,
} from "../../redux/Tourslice";
import "./Tourlist.css";
import ImageViewer from "../ImageViewer/ImageViewer";
import { motion } from "framer-motion";

function Tourlist({ searchTerm }) {
  const dispatch = useDispatch();
  const tours = useSelector((state) => state.Tour.tours);
  // console.log(tours);
  const likes = useSelector((state) => state.Tour.likes);
  const decodedTokenJSON = localStorage.getItem("decodedToken");
  const user = JSON.parse(decodedTokenJSON);
  // console.log(user)
  const uid = user.userId;
  const [selectedImage, setSelectedImage] = useState(null);
  // console.log(tours)
  // Fetch tours when the component mounts
  console.log(uid);
  // console.log(tours.Userid)
  useEffect(() => {
    dispatch(getTour());
  }, [dispatch, searchTerm, likes]);

  const handleDelete = (tourId) => {
    dispatch(deleteTour(tourId));
  };
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };
  const handleLike = (tourId) => {
    console.log("like is clicked");
    // Dispatch the likeTour action when the like icon is clicked
    dispatch(likeTour(tourId));
  };

  const handledisLike = (tourId) => {
    console.log("dislike is clicked");
    // Dispatch the likeTour action when the like icon is clicked
    dispatch(dislikeTour(tourId));
  };

  // Filter tours based on the search term
  const filteredTours = searchTerm
    ? tours.filter((tour) =>
        tour.Tourname.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : tours;
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
      {filteredTours.map((tour) => (
        <div key={tour.id} className="tour-item-container">
          <motion.div className="tour-item" whileHover={{ scale: 1.1 }}>
            <h2>{tour.Tourname}</h2>
            <img
              src={tour.Tourimage}
              alt={tour.Tourname}
              onClick={() => handleImageClick(tour.Tourimage)}
            />
            <p>{tour.TourDescription}</p>
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
                  onClick={() => handleDelete(tour.id)}
                >
                  {" "}
                  Delete
                </i>
              ): null}
            </div>
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
}

export default Tourlist;
