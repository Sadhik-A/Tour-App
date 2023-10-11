import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Homepage.scss";
import Tourlist from "../../Components/Tourlist/Tourlist";
import { useDispatch, useSelector } from "react-redux";
import { getTour, setAlertMessage } from "../../redux/Tourslice";
import Header from "../../Components/Header/Header";
function HomePage() {
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 
  const dispatch = useDispatch();
  const AlertMessage = useSelector((state) => state.Tour.alertmessage);
 
  useEffect(() => {
    dispatch(getTour());
  }, [dispatch]);
  useEffect(() => {
    if (AlertMessage) {
      setIsAlertVisible(true);
      setTimeout(() => {
        setIsAlertVisible(false);
        dispatch(setAlertMessage(""));
      }, 3000);
    }
  }, [AlertMessage,dispatch]);
  return (
    <>
      <Header setSearchTerm={setSearchTerm} />
      <div>
        {AlertMessage && isAlertVisible && (
          <div className="tour-alert">
            <motion.p
              className={`alert ${
                AlertMessage === "Tour deleted successfuly"
                  ? "success"
                  : "error"
              }`}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              {AlertMessage}
            </motion.p>
          </div>
        )}
        <Tourlist searchTerm={searchTerm} />
      </div>
    </>
  );
}
export default HomePage;
