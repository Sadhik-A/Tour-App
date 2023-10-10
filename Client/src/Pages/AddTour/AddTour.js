import React from "react";
import './AddTour.scss';
import '../../Pages/Homepage/Homepage.scss';
import '../../Pages/RegisterationPage/RegisterationForm.scss';
import { useSelector, useDispatch } from "react-redux";
import FormGroup from "../../Components/FormGroup/FormGroup";
import {
  setTourName,
  setTourImage,
  setTourDescription,
  submitTour,
  setAlertMessage,
  setRegisterationSuccess,
} from "../../redux/Tourslice";
import { useEffect ,useState} from "react";
import { CloudinaryContext } from "cloudinary-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
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
  const Userid = user.userId
  // console.log(uid)
  // console.log(user)
  const dispatch = useDispatch();
    const navigate = useNavigate(); 
  // console.log(AlertMessage);
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
      setAlertMessage("");
    };
  }, [dispatch]);

  useEffect(() => {
    if (AlertMessage) {
      setIsAlertVisible(true);
      setTimeout(() => {
        setIsAlertVisible(false);
        setLocalAlertMessage("");
      }, 1000); 
    }
  }, [AlertMessage]);


  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(submitTour({ Tourname, TourDescription, TourImage, Userid }));
    dispatch(setTourName(""));
    dispatch(setTourImage(""));
    dispatch(setTourDescription(""));
    setLocalAlertMessage("");
    setIsAlertVisible(true);
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

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
      // console.error("Error uploading image:", error);
    }
  };


  return (
    <>
      <div className="container">
        <h1>Add Tour</h1>
        <CloudinaryContext cloudname="dzs0grxic">
          <form
            onSubmit={handleSubmit}
            className="add-book-form"
            encType="multipart/form-data"
          >
            <FormGroup
              label="Enter Name of the Place:"
              name="placeName"
              value={Tourname}
              onChange={(e) => dispatch(setTourName(e.target.value))}
              required={true}
            />
            <FormGroup
              label="Upload Image:"
              name="Tourimage"
              type="file"
              onChange={handleImageUpload}
              accept="image/*"
              required={true}
            />
            <FormGroup
              label="Add Description:"
              name="description"
              value={TourDescription}
              onChange={(e) => dispatch(setTourDescription(e.target.value))}
              required={true}
            />
            <button type="submit" className="add-book-button">
              Add Tour
            </button>
            {isAlertVisible && localAlertMessage && (
              <motion.p
                className={`alert ${
                  localAlertMessage === "Tour Added successfuly"
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
          </form>
        </CloudinaryContext>
      </div>
    </>
  );
}
export default AddBook;
