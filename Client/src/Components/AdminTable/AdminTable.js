import React, { useState,useEffect} from "react";
import "./AdminTable.scss";
import profile from "../../assets/profile.svg";
import Location from "../../assets/Location.svg";
import DeleteRed from "../../assets/DeleteRed.svg";
import { useSelector, useDispatch } from "react-redux";
import { deleteTour } from "../../redux/Tourslice";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
function Adminable() {
  const tours = useSelector((state) => state.Tour.tours);
  console.log(tours)
  let filteredTours = tours;
  const [show, setShow] = useState(false);
   const [tourToDelete, setTourToDelete] = useState(null);
  const [deletetour, setDeleteTour] = useState(false);
   const dispatch = useDispatch();
    useEffect(() => {
      if (deletetour) {
        dispatch(deleteTour(tourToDelete));
        setDeleteTour(false);
        setTourToDelete(null);
      }
    }, [deletetour, dispatch, tourToDelete]);
   const handleShow = (tourId) => {
     setShow(true);
     handleDelete(tourId);
   };
    const handleDelete = (tourId) => {
      setTourToDelete(tourId);
    };
  return (
    <div className="table-container">
      <table>
        <thead className="table-heading">
          <tr>
            <th>User</th>
            <th>Place</th>
            <th>Image</th>
            <th>Downloads</th>
            {/* <th>Heading 5</th> */}
          </tr>
        </thead>
        {filteredTours.map((tour) => (
          <tbody key={tour._id}>
            <tr>
              <td>
                <div className="user-details">
                  <img
                    src={profile}
                    alt="circle"
                    className="circle"
                    // onClick={() => navigate("/profile")}
                  />
                  <div className="username">{tour.Username}</div>
                </div>
              </td>
              <td>
                <div className="place-details">
                  <img
                    src={Location}
                    alt="circle"
                    className="circle"
                    // onClick={() => navigate("/profile")}
                  />
                  <div className="username">{tour.Tourname}</div>
                </div>
              </td>
              <td>
                <div className="image-details">
                  <img
                    src={tour.Tourimage}
                    alt="circle"
                    className="circle"
                    // onClick={() => navigate("/profile")}
                  />
                </div>
              </td>
              <td>31k</td>
              <td>
                <div className="delete">
                  <img
                    src={DeleteRed}
                    alt="circle"
                    className="delete-icon-red"
                    onClick={() => handleShow(tour.id)}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      <ConfirmDialog
        title="Confirm Delete"
        subtitle="Are you sure you want to delete this tour?"
        setDeleteTour={setDeleteTour}
        show={show}
        setShow={setShow}
      />
    </div>
  );
}

export default Adminable;
