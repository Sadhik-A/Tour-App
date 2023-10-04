import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getTour, deleteTour, likeTour,dislikeTour } from "../../redux/Tourslice";
import "./Tourlist.css";

import { motion } from "framer-motion";

function Tourlist({ searchTerm }) {
  const dispatch = useDispatch();
  const tours = useSelector((state) => state.Tour.tours);
  const likes = useSelector((state) => state.Tour.likes);
  // console.log(tours)
  // Fetch tours when the component mounts
  useEffect(() => {
    dispatch(getTour());
  }, [dispatch, searchTerm,likes]);
  
  const handleDelete = (tourId) => {
    dispatch(deleteTour(tourId));
  };

  const handleLike = (tourId) => {
    console.log('like is clicked' )
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
      {filteredTours.map((tour) => (
        <div key={tour.id} className="tour-item-container">
          <motion.div className="tour-item" whileHover={{ scale: 1.1 }}>
            <h2>{tour.Tourname}</h2>
            <img src={tour.Tourimage} alt={tour.Tourname} />
            <p>{tour.TourDescription}</p>
            <div className="tour-icons">
              <Link to={`/editTour/${tour.id}`}>
                <i className="fa fa-edit edit-icon"> Edit</i>
              </Link>
              <i
                className="fa fa-thumbs-up like-icon" // Like icon
                onClick={() => handleLike(tour.id)} // Call handleLike when the like icon is clicked
              >
                {tour.likes}
              </i>
              <i className="fa fa-thumbs-down like-icon"
                onclick={() => handledisLike(tour.id)}>{""}</i>
              <i
                className="fa fa-trash delete-icon"
                onClick={() => handleDelete(tour.id)}
              >
                {" "}
                Delete
              </i>
            </div>
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
}

export default Tourlist;
