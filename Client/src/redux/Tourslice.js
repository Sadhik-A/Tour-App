import { createSlice } from "@reduxjs/toolkit";
import { SERVER_URLS } from "../utils/config";
import axios from "axios";
const initialState = {
  tours: [],
  Tourname: "",
  TourDescription: "",
  Tourimage: "",
  alertmessage: "",
  registerationSuccess: false,
  likes: {},
  mytour: false,
  searchterm: "",
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
    setmytour: (state, action) => {
      state.mytour = action.payload;
    },
    updateLikes: (state, action) => {
      const { tourId, likes } = action.payload;
      state.likes = { ...state.likes, [tourId]: likes };
    },
    setsearchterm: (state, action) => {
      state.searchterm = action.payload;
    },
    removesearchterm: (state, action) => {
      state.searchterm = "";
    }
  },
});
// export const likeTour = (tourId) => async (dispatch) => {
//   try {
//     const response = await axios.post(
//       `${SERVER_URLS.production}/api/likeTour/${tourId}`
//     );
//     if (response.status===200) {
//       const { likes } = await response.data;
//       console.log(likes);
//       dispatch(updateLikes({ tourId, likes }));
//       setAlertMessage(response.data.message);
//     } 
//   } catch (error) {
//     console.error("Error:", error);
//     error.response
//       ? dispatch(setAlertMessage(error?.response?.data?.message))
//       : dispatch(setAlertMessage("An error occurred, please try again"));
//   }
// };
// export const dislikeTour = (tourId) => async (dispatch) => {
//   try {
//     const response = await axios.post(
//       // `http://localhost:3000/api/dislikeTour/${tourId}`,
//       `https://tour-webapp.onrender.com/api/dislikeTour/${tourId}`
//     );

//     if (response.status===200) {
//       const { likes } = await response.data;
//       console.log(likes);
//       dispatch(updateLikes({ tourId, likes }));
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     error.response
//       ? dispatch(setAlertMessage(error?.response?.data?.message))
//       : dispatch(setAlertMessage("An error occurred, please try again"));
//   }
// };
//adding a tour 
export const submitTour = (TourData) => async (dispatch) => {
  try {
    // console.log(TourData);
    const response = await axios.post(
      `${SERVER_URLS.production}/api/addTour`,
      TourData,
      {
        withCredentials: true,
      }
    );
    if (response.status === 201) {
      dispatch(setAlertMessage(response.data.message));
          dispatch(setRegisterationSuccess(true));
      // console.log('Tour Added successfuly');
    } 
  } catch (error) {
   error.response
     ? dispatch(setAlertMessage(error?.response?.data?.message))
     : dispatch(setAlertMessage("An error occurred, please try again"));
  } 
};

// editing a tour
export const editTour = (TourData) => async (dispatch) => {
  try {
    // console.log(TourData);
    const response = await axios.put(
      `${SERVER_URLS.production}/api/editTour`,
      TourData,
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      dispatch(setAlertMessage(response.data.message));
      dispatch(setRegisterationSuccess(true));
      // console.log('Tour Added successfuly');
    }
  } catch (error) {
     error.response
       ? dispatch(setAlertMessage(error?.response?.data?.message))
       : dispatch(setAlertMessage("An error occurred, please try again"));
    // console.error("Error:", error);
  }
};

// getting all tours
export const getTour = () => async (dispatch) => {
  try {
    const response = await axios.get(
        `${SERVER_URLS.production}/api/getTours`,
    );
    if (response.status === 200) {
      const tourData = await response.data;
      //  console.log(tourData)
      // console.log("Tour data received successfully:", tourData);
         dispatch(storeTourData(tourData));
    } 
  } catch (error) {
    error.response
      ? dispatch(setAlertMessage(error?.response?.data?.message))
      : dispatch(setAlertMessage("An error occurred, please try again"));
  }
};


// deleting a tour
export const deleteTour = (id,) => async (dispatch, getState) => {
  try {
//  console.log(uid)  
    const response = await axios.delete(
      `${SERVER_URLS.production}/api/deleteTour/${id}`,
      {
        withCredentials: true,
      }
    );
    if (response.status === 200) {
       dispatch(setAlertMessage(response.data.message));
       const updatedTours = getState().Tour.tours.filter(
         (tour) => tour.id !== id
       );
       dispatch(storeTourData(updatedTours));
    }
  } catch (error) {
    console.error("Error:", error);
    error.response
      ? dispatch(setAlertMessage(error?.response?.data?.message))
      : dispatch(setAlertMessage("An error occurred, please try again"));
  }
};


export const { removesearchterm, setsearchterm, setTourName, setTourDescription, setTourImage, setAlertMessage ,storeTourData,setRegisterationSuccess,updateLikes,setmytour} = tourSlice.actions;
export default tourSlice.reducer