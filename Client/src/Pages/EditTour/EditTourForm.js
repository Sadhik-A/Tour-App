import React, { useState, useEffect,useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../../Components/FormGroup/FormGroup.scss";
import FormGroup from "../../Components/FormGroup/FormGroup";
import '../../Pages/Login/Loginform.scss'
import Header from "../../Components/Header/Header";
import UploadDull from "../../assets/image-upload-dull.svg";
import UploadBright from "../../assets/image-upload-bright.svg";
import {
  setTourName,
  setTourImage,
  setTourDescription,
  setAlertMessage,
  editTour,
  setRegisterationSuccess,
} from "../../redux/Tourslice";
import { CloudinaryContext } from "cloudinary-react";
import '../../Pages/AddTour/AddTour.scss'

function EditTourForm() {
   const [localAlertMessage, setLocalAlertMessage] = useState("");
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
  );
  const selectedTour = tours.find((tour) => tour.id === Number(TourId));
   const decodedTokenJSON = localStorage.getItem("decodedToken");
   const user = JSON.parse(decodedTokenJSON);
   const Userid = user.userId;
   const Username = user.username;
  const fileInputRef = useRef(null);
    const [imageFileName, setImageFileName] = useState("");
    const [selectedImageFile, setSelectedImageFile] = useState(null);
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
  }, [AlertMessage, dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editTour({ TourId, Tourname, TourDescription, TourImage, Userid, Username }));
    dispatch(setTourName(""));
    dispatch(setTourImage(""));
    dispatch(setTourDescription(""));
    // setIsAlertVisible(true);
  };

   const handleFileInput = async (file) => {
     if (file) {
       if (
         file.type !== "image/jpeg" &&
         file.type !== "image/png" &&
         file.type !== "image/gif"
       ) {
         dispatch(
           setAlertMessage("Please select a valid image file (JPEG, PNG)")
         );
         setIsAlertVisible(true);
         return;
       }
       setImageFileName(file.name);
       setSelectedImageFile(file);
       try {
         const formData = new FormData();
         formData.append("file", file);
         formData.append("upload_preset", "tourapp");

         // Send the image to Cloudinary
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
     }
   };
 
  const handleFileInputChange = (e) => {
    handleFileInput(e.target.files[0]);
  };

  const handleImageDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileInput(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <CloudinaryContext cloudname="dzs0grxic">
        <form
          onSubmit={handleSubmit}
          className="add-book-form"
          encType="multipart/form-data"
        >
          <div className="main-section">
            <div className="heading">Edit Your Tour Photos</div>
            <div
              className="Image-upload"
              onDrop={handleImageDrop}
              onDragOver={handleDragOver}
            >
              <div className="image-add">
                <div className="upload-icon">
                  <img
                    className="upload-image-icon"
                    src={UploadDull}
                    alt="Upload"
                  />
                  <img
                    className="upload-image-icon1"
                    src={UploadBright}
                    alt="Upload"
                  />
                </div>
                <div className="image-text">
                  {imageFileName ? (
                    <p>Uploaded: {imageFileName}</p>
                  ) : (
                    <div className="drop">
                      <p>Drag and drop an image, or </p>
                      <label className="file-input-label">
                        browse
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileInputChange}
                          ref={fileInputRef}
                          style={{ display: "none" }}
                        />
                      </label>
                    </div>
                  )}
                </div>
                {TourImage && <img src={TourImage} alt="Uploaded" />}
                <div className="sub-text">
                  Minimum 1600px width recommended. Max 10MB each
                </div>
              </div>
            </div>
            <div className="place-name">
              <div className="label">Place name</div>
              <input
                className="form-input"
                type="text"
                name="placeName"
                value={Tourname}
                onChange={(e) => dispatch(setTourName(e.target.value))}
                required={true}
                placeholder="Enter the name of the place"
              />
            </div>
            <div className="place-name">
              <div className="label">Add a description</div>
              <textarea
                className="form-input1"
                type="text"
                name="placeName"
                value={TourDescription}
                onChange={(e) => dispatch(setTourDescription(e.target.value))}
                required={true}
              />
            </div>
            {isAlertVisible && localAlertMessage && (
              <motion.p
                className={`alert ${
                  localAlertMessage === "Tour added successfully"
                    ? "success"
                    : "error"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {localAlertMessage}
              </motion.p>
            )}
            <div className="upload-buttons">
              <button type="submit" className="upload-icon">
                <p>Upload</p>
              </button>
              <div className="Cancel-button" onClick={() => navigate("/home")}>
                <p className="Cancel-text">Cancel</p>
              </div>
            </div>
          </div>
        </form>
      </CloudinaryContext>
    </>
  );
}

export default EditTourForm;
