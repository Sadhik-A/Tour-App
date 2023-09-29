import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getTour, deleteTour } from "../../redux/Tourslice";
import "./Tourlist.css";
import { setAlertMessage } from "../../redux/Tourslice";
import { motion } from "framer-motion";

function Tourlist({ searchTerm }) {
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const AlertMessage = useSelector((state) => state.Tour.alertmessage);
  const dispatch = useDispatch();
  const tours = useSelector((state) => state.Tour.tours);

  useEffect(() => {
    return () => {
      dispatch(setAlertMessage(""));
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTour());
    setIsAlertVisible(true);
  }, [dispatch]);

  useEffect(() => {
    if (AlertMessage) {
      setIsAlertVisible(true);
      setTimeout(() => {
        setIsAlertVisible(false);
      }, 3000);
    }
  }, [AlertMessage]);

  const handleDelete = (tourId) => {
    setIsAlertVisible(true);
    dispatch(deleteTour(tourId));
  };

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
