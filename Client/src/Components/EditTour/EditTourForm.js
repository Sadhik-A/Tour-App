import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import '../../Components/AddTour/AddTour.css';
import { useNavigate } from "react-router-dom";
// import "../../Components/HomePage/HomePage.css";
import {
  setTourName,
  setTourImage,
  setTourDescription,
  setAlertMessage,
  editTour,
  setRegisterationSuccess
} from "../../redux/Tourslice";
import { CloudinaryContext } from "cloudinary-react";

function EditTourForm() {
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const location = useLocation();
   const navigate = useNavigate(); 
  const TourId = location.pathname.split("/").pop();
  const dispatch = useDispatch();
  const Tourname = useSelector((state) => state.Tour.Tourname);
  const TourDescription = useSelector((state) => state.Tour.TourDescription);
  const TourImage = useSelector((state) => state.Tour.Tourimage);
  const AlertMessage = useSelector((state) => state.Tour.alertmessage);
  const tours = useSelector((state) => state.Tour.tours);
  const registrationSuccess = useSelector(
    (state) => state.Tour.registerationSuccess
  )
  const selectedTour = tours.find((tour) => tour.id === Number(TourId));

  // console.log(tours);
  useEffect(() => {
    if (selectedTour) {
      dispatch(setTourName(selectedTour.Tourname));
      dispatch(setTourDescription(selectedTour.TourDescription));
      dispatch(setTourImage(selectedTour.Tourimage));
    }
  }, [selectedTour, dispatch]);
  useEffect(() => {
    return () => {
      dispatch(setTourName(""));
      dispatch(setTourImage(""));
      dispatch(setTourDescription(""));
      dispatch(setAlertMessage(""));
      // setIsAlertVisible(false);
      setAlertMessage("");
    };
  }, [dispatch]);
useEffect(() => {
  if (registrationSuccess) {
    setTimeout(() => {
      navigate("/home");
      dispatch(setRegisterationSuccess(false));
    }, 2000);
  }
}, [registrationSuccess, navigate, dispatch]);
  useEffect(() => {
    if (AlertMessage) {
      setIsAlertVisible(true);
      setTimeout(() => {
        setIsAlertVisible(false);
        dispatch(setAlertMessage(""));
      }, 1000);
    }
  }, [AlertMessage,dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editTour({ TourId, Tourname, TourDescription, TourImage }));
    dispatch(setTourName(""));
    dispatch(setTourImage(""));
    dispatch(setTourDescription(""));
    // setIsAlertVisible(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "tourapp");
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dzs0grxic/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        dispatch(setTourImage(data.secure_url));
      } else {
        console.error("Failed to upload image to Cloudinary.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="container">
      <h1>Edit Tour</h1>
      <CloudinaryContext cloudname="dzs0grxic">
        <form
          onSubmit={handleSubmit}
          className="add-book-form"
          encType="multipart/form-data"
        >
          <div className="form-group">
            <label> Name of the Place:</label>
            <input
              type="text"
              name="placeName"
              value={Tourname}
              onChange={(e) => dispatch(setTourName(e.target.value))}
              required
            />
          </div>
          <div className="form-group">
            <label> Image:</label>
            <input
              type="file"
              name="Tourimage"
              onChange={handleImageUpload}
              accept="image/*"
              required
            />
          </div>
          <div className="form-group">
            <label> Description:</label>
            <textarea
              name="description"
              value={TourDescription}
              onChange={(e) => dispatch(setTourDescription(e.target.value))}
              required
            ></textarea>
          </div>
          <button type="submit" className="add-book-button">
            Save Changes
          </button>
          {AlertMessage && isAlertVisible && (
            <div classname="tour-alert">
              <motion.p
                className={`alert ${
                  AlertMessage === "Tour Updated successfuly"
                    ? "success"
                    : "error"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {AlertMessage}
              </motion.p>
            </div>
          )}
        </form>
      </CloudinaryContext>
    </div>
  );
}

export default EditTourForm;
