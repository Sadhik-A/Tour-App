import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import axios from "axios";
const initialState = {
  username: "",
  profile: "",
  email: "",
  password: "",
  emailError: "",
  passwordError: "",
  confirmpassword: "",
  loading: false,
  alertmessage: null,
  user: null,
  token: localStorage.getItem("authToken") || null,
  registerationSuccess: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
   setProfile: (state, action) => {
     state.profile = action.payload;
   },
    setEmail: (state, action) => {
      state.email = action.payload;
      //console.log(state.email)
    },
    setPassword: (state, action) => {
      state.password = action.payload;
      //console.log(state.password)
    },
    setEmailError: (state, action) => {
      state.emailError = action.payload;
    },

    setPasswordError: (state, action) => {
      state.passwordError = action.payload;
    },
    setConfirmPassword: (state, action) => {
      state.confirmpassword = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAlertMessage: (state, action) => {
      state.alertmessage = action.payload;
    },
    setAuthToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("authToken", action.payload);
    },
    clearAuthToken: (state) => {
      state.token = null;
      localStorage.removeItem("authToken");
    },
    setUserData: (state, action) => {
      state.user = action.payload;
    },
    clearUserData: (state) => {
      state.user = null;
    },
    setRegisterationSuccess: (state, action) => {
      state.registerationSuccess = action.payload;
    },
  },
});

//registration of user

export const submitRegistration = (registrationData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setAlertMessage(""));

    const response = await axios.post(
      // "http://localhost:3000/api/register",
      "https://tour-app-zcms.onrender.com/api/register",
      registrationData
    );
    if (response.status === 201) {
      dispatch(setAlertMessage(response.data.message));
    } 
  } catch (error) {
    console.error("Error:", error);
    error.response?dispatch(setAlertMessage(error?.response?.data?.message)):dispatch(setAlertMessage("An error occurred, please try again"));
  } finally {
    dispatch(setLoading(false));
  }
};

// login a user

export const submitLogin = (loginData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    dispatch(setAlertMessage(""));

    const response = await axios.post(
      //  "http://localhost:3000/api/login",
      "https://tour-app-zcms.onrender.com/api/login",
      loginData,
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      console.log(response.data)
      const userData = response.data;
      const authToken = userData.token;
      const decodedToken = jwt_decode(authToken);
      localStorage.setItem("decodedToken", JSON.stringify(decodedToken));
      dispatch(setAuthToken(authToken));
      dispatch(setUserData(userData));
      console.log(response.data.message)
      if (decodedToken.is_admin !== 1) {
        dispatch(setAlertMessage(response.data.message));
      } else {
        dispatch(setAlertMessage("Admin logged in successfully"));
      }
    } 
  } catch (error) {
    console.error("Error:", error);
    
      error.response ? dispatch(setAlertMessage(error?.response?.data?.message)) : dispatch(setAlertMessage("An error occurred, please try again"));
    
   
  } finally {
    dispatch(setLoading(false));
  }
};

export const {
  setEmail,
  setPassword,
  setEmailError,
  setPasswordError,
  setConfirmPassword,
  clearConfirmPassword,
  setLoading,
  setAlertMessage,
  setAuthToken,
  clearAuthToken,
  setUserData,
  clearUserData,
  setRegisterationSuccess,
  setProfile,
  setUsername,
} = userSlice.actions;
export default userSlice.reducer;
