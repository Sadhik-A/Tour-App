import React, { useState, useEffect, useRef } from "react";
import "./AddTour.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  setTourName,
  setTourImage,
  setTourDescription,
  submitTour,
  setAlertMessage,
  setRegisterationSuccess,
} from "../../redux/Tourslice";
import { CloudinaryContext } from "cloudinary-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import UploadDull from "../../assets/image-upload-dull.svg";
import UploadBright from "../../assets/image-upload-bright.svg";

function AddBook() {
  const [localAlertMessage, setLocalAlertMessage] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const Tourname = useSelector((state) => state.Tour.Tourname);
  const TourDescription = useSelector((state) => state.Tour.TourDescription);
  const TourImage = useSelector((state) => state.Tour.Tourimage);
  const AlertMessage = useSelector((state) => state.Tour.alertmessage);
  const registrationSuccess = useSelector(
    (state) => state.Tour.registerationSuccess
  );
  const decodedTokenJSON = localStorage.getItem("decodedToken");
  const user = JSON.parse(decodedTokenJSON);
  const Userid = user.userId;
  const Username = user.username;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [imageFileName, setImageFileName] = useState("");
  const [ imagefile, setSelectedImageFile] = useState(null);
  // console.log(AlertMessage);
  // console.log(localAlertMessage);
  useEffect(() => {
    setLocalAlertMessage(AlertMessage);
  }, [AlertMessage]);

  useEffect(() => {
    if (registrationSuccess) {
      setTimeout(() => {
        navigate("/home");
        dispatch(setRegisterationSuccess(false));
      }, 2000);
    }
  }, [registrationSuccess, navigate, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(setTourName(""));
      dispatch(setTourImage(""));
      dispatch(setTourDescription(""));
      dispatch(setAlertMessage(""));
      setLocalAlertMessage("");
      setIsAlertVisible(false);
    };
  }, [dispatch]);

  useEffect(() => {
    if (AlertMessage) {
      setIsAlertVisible(true);
      setTimeout(() => {
        setIsAlertVisible(false);
        setLocalAlertMessage("");
      }, 5000);
    }
  }, [AlertMessage]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      submitTour({ Tourname, TourDescription, TourImage, Userid, Username })
    );
    dispatch(setTourName(""));
    dispatch(setTourImage(""));
    dispatch(setTourDescription(""));
    setLocalAlertMessage("");
    setIsAlertVisible(true);
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
        formData.append("file", imagefile);
        formData.append("upload_preset", "tour-app");

        // Send the image to Cloudinary
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dzs0grxic/image/upload",
          {
            method: "POST",
            body: formData,
            parameers: {
              upload_preset: "tour-app",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          dispatch(setTourImage(data.secure_url));
        } else {
          dispatch(setAlertMessage("Failed to upload image to Cloudinary."));
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
            <div className="heading">Add Your Tour Photos</div>
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

            <div className="upload-buttons">
              <button type="submit" className={TourImage ? "active-button" : "dull-button"}>
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

export default AddBook;
