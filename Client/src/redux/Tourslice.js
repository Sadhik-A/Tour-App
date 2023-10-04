import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  tours: [],
  Tourname: "",
  TourDescription: "",
  Tourimage: "",
  alertmessage: "",
  registerationSuccess: false,
  likes: {},
};
const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    setTourName: (state, action) => {
      // console.log(action.payload)
      state.Tourname = action.payload;
    },
    setTourDescription: (state, action) => {
      state.TourDescription = action.payload;
    },
    setTourImage: (state, action) => {
      state.Tourimage = action.payload;
    },
    storeTourData: (state, action) => {
      state.tours = action.payload;
    },
    setAlertMessage: (state, action) => {
      state.alertmessage = action.payload;
    },
    setRegisterationSuccess: (state, action) => {
      state.registerationSuccess = action.payload;
    },
    updateLikes: (state, action) => {
      const { tourId, likes } = action.payload;
      state.likes = { ...state.likes, [tourId]: likes };
    },
  },
});
export const likeTour = (tourId) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://tour-app-zcms.onrender.com/api/likeTour/${tourId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      
      const { likes } = await response.json();
      console.log(likes);
      dispatch(updateLikes({ tourId, likes }));
    } else { 
     dispatch(setAlertMessage("Like tour failed"));
    }
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
  }
};

//adding a tour 
export const submitTour = (TourData) => async (dispatch) => {
  try {
    // console.log(TourData);
    const response = await fetch(
      // "http://localhost:3000/api/addTour",
      "https://tour-app-zcms.onrender.com/api/addTour",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(TourData),
      }
    );
    if (response.ok) {
      dispatch(setAlertMessage("Tour Added successfuly"));
          dispatch(setRegisterationSuccess(true));
      // console.log('Tour Added successfuly');
    } else {
      // dispatch(setAlertMessage("add tour failed"));
      // console.log('add tour failed');
    }
  } catch (error) {
    // console.error("Error:", error);
  } 
};

// editing a tour
export const editTour = (TourData) => async (dispatch) => {
  try {
    // console.log(TourData);
    const response = await fetch(
      // "http://localhost:3000/api/editTour",
      "https://tour-app-zcms.onrender.com/api/editTour",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(TourData),
      }
    );
    if (response.ok) {
      dispatch(setAlertMessage("Tour Updated successfuly"));
          dispatch(setRegisterationSuccess(true));
      // console.log('Tour Added successfuly');
    } else {
      dispatch(setAlertMessage("You are not authorized to edit tour"));
      // console.log("update tour failed");
    }
  } catch (error) {
    // console.error("Error:", error);
  }
};

// getting all tours
export const getTour = () => async (dispatch) => {
  try {
    const response = await fetch(
      // "http://localhost:3000/api/getTours",
      "https://tour-app-zcms.onrender.com/api/getTours",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      const tourData = await response.json();
      //  console.log(tourData)
      // console.log("Tour data received successfully:", tourData);
         dispatch(storeTourData(tourData));
    } else {
      // console.log("Fetching tour data failed");
    }
  } catch (error) {
    // console.error("Error:", error);
  }
};

// deleting a tour
export const deleteTour = (id) => async (dispatch, getState) => {
  try {
    // console.log(user);
    const response = await fetch(
    //  `http://localhost:3000/api/deleteTour/${id}`,
      `https://tour-app-zcms.onrender.com/api/deleteTour/${id}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
       dispatch(setAlertMessage("Tour deleted successfuly"));
       const updatedTours = getState().Tour.tours.filter(
         (tour) => tour.id !== id
       );
       dispatch(storeTourData(updatedTours));
      // const tourData = await response.json();
      //  console.log(tourData)
      // console.log("Tour deleted successfully:");
      // dispatch(storeTourData(tourData)); 
    }
    else if (response.status === 401) {
      dispatch(setAlertMessage("You are not authorized to delete tour"));
    }
    else {
       const errorData = await response.json(); 
       dispatch(setAlertMessage(errorData.error));
      // console.log("deleting tour failed");
    }
  } catch (error) {
    // console.error("Error:", error);
  }
};


export const { setTourName, setTourDescription, setTourImage, setAlertMessage ,storeTourData,setRegisterationSuccess,updateLikes} = tourSlice.actions;
export default tourSlice.reducer