import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getTour, deleteTour, likeTour } from "../../redux/Tourslice";
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
    console.log('like is clicked ' )
    // Dispatch the likeTour action when the like icon is clicked
    dispatch(likeTour(tourId));
   
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
          <motion.div
            className="tour-icons"
            initial={{ scale: 1 }} 
            whileHover={{ scale: 1.1 }} 
          >
            <Link to={`/editTour/${tour.id}`}>
              <i className="fa fa-edit edit-icon"> Edit</i>
            </Link>
            <motion.div
              className="like-icon-container"
              onClick={() => handleLike(tour.id)}
            >
              <i className="fa fa-thumbs-up like-icon">
                {tour.likes} 
              </i>
            </motion.div>
            <i
              className="fa fa-trash delete-icon"
              onClick={() => handleDelete(tour.id)}
            >
              {" "}
              Delete
            </i>
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
}

export default Tourlist;
