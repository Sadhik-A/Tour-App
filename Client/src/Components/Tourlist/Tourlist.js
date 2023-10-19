import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { getTour, deleteTour } from "../../redux/Tourslice";
import Filesaver from "file-saver";
import "./Tourlist.scss";
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
import Nodata from "../../assets/No data.gif";
function Tourlist() {
  const searchTerm = useSelector((state) => state.Tour.searchterm);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const tours = useSelector((state) => state.Tour.tours);
  const mytour = useSelector((state) => state.Tour.mytour);
  const decodedTokenJSON = localStorage.getItem("decodedToken");
  const user = JSON.parse(decodedTokenJSON);
  const uid = user.userId;
  const [tourToDelete, setTourToDelete] = useState(null);
  const [deletetour, setDeleteTour] = useState(false);
  const [show, setShow] = useState(false);
  const handleShow = (tourId) => {
    setShow(true);
    handleDelete(tourId);
  };
  let filteredTours = tours;
  filteredTours =
    location.pathname === "/profile"
      ? tours.filter((tour) => tour.Userid === uid || user.is_admin === 1)
      : tours;
  useEffect(() => {
    dispatch(getTour());
  }, [dispatch, searchTerm, mytour]);
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
 const handleDownload = (image,filename) => {
    Filesaver.saveAs(image, filename);
 }
  const filteredAndSearchedTours = mytour
    ? filteredTours
    : searchTerm
    ? filteredTours.filter((tour) =>
        tour.Tourname.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredTours 
  return (
    <motion.div
      className="tour-list"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {filteredAndSearchedTours.length === 0 ? (<img className="nodata" src={Nodata} alt="nodata" />)
        : (
          
            filteredAndSearchedTours.map((tour) => (
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
                                : () => { handleDownload(tour.Tourimage, tour.Tourname) }
                            }
                          />
                        </div>
                      </div>
                      <Link to={`/description/${tour.id}`}>
                        <div className="transparent-div"></div>
                      </Link>
                      <div className="description">
                        <div className="user">
                          <div className="user-details">
                            <img src={profile} alt="circle" className="circle1" />
                            <div className="user-name">{tour.Username}</div>
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
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            ))
          )}
      {location.pathname === "/profile" ? (
        <div className="tour-image1">
          <div className="addnew-tour" onClick={() => navigate("/addTour")}>
            <img src={Bluecircle} alt="circle" className="add-icon" />
            <img src={Gallery1} alt="circle" className="add-gallery" />
            <p className="add-text"> Submit your next photo</p>
          </div>
        </div>
      ) : null}
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
