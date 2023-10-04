import React, { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getTour, deleteTour, likeTour,dislikeTour } from "../../redux/Tourslice";
import "./Tourlist.css";
import ImageViewer from "../ImageViewer";
import { motion } from "framer-motion";

function Tourlist({ searchTerm }) {
  const dispatch = useDispatch();
  const tours = useSelector((state) => state.Tour.tours);
  const likes = useSelector((state) => state.Tour.likes);
  const [selectedImage, setSelectedImage] = useState(null);
  // console.log(tours)
  // Fetch tours when the component mounts
  useEffect(() => {
    dispatch(getTour());
  }, [dispatch, searchTerm,likes]);
  
  const handleDelete = (tourId) => {
    dispatch(deleteTour(tourId));
  };
 const handleImageClick = (imageUrl) => {
   setSelectedImage(imageUrl);
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
      {selectedImage && (
        <ImageViewer
          imageUrl={selectedImage}
          onClose={() => setSelectedImage(null)} // Add a function to close the viewer
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
                <Link to={`/editTour/${tour.id}`}>
                  <i className="fa fa-edit edit-icon"> Edit</i>
                </Link>
                <i
                  className="fa fa-thumbs-up like-icon" // Like icon
                  onClick={() => handleLike(tour.id)} // Call handleLike when the like icon is clicked
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
