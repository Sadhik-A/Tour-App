import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
const initialState = {
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
    setRegisterationSuccess: (state,action) => {
      state.registerationSuccess = action.payload;
    }
  },
});
 

//registration of user
export const submitRegistration = (registrationData) => async (dispatch) => {
 
  try {
    dispatch(setLoading(true)); 
    dispatch(setAlertMessage(""));
    const response = await fetch(
      //  "http://localhost:3000/api/register",
      "https://tour-app-zcms.onrender.com/api/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      }
    );
    // console.log(response);
    if (response.ok) {
      dispatch(setAlertMessage("registeration successful"));
      dispatch(setRegisterationSuccess(true));
    } else {
      dispatch(setAlertMessage("registaeration failed"));
    }
  } catch (error) {
    // console.error("Error:", error);
    dispatch(setAlertMessage("email already exists"));
  } finally {
    dispatch(setLoading(false));
  }
};

// login a user
export const submitLogin = (LoginData) => async (dispatch) => {
  try {
    dispatch(setLoading(true)); 
    dispatch(setAlertMessage(""));
    
    const response = await fetch(
      // "http://localhost:3000/api/login",
      "https://tour-app-zcms.onrender.com/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        credentials: "include",
        body: JSON.stringify(LoginData),
      }
    );

    if (response.ok) {
      const Userdata = await response.json();
      const authToken = Userdata.token;
      const decodedToken = jwt_decode(authToken);
      // console.log(`authToken: ${authToken}`);
       localStorage.setItem("decodedToken", JSON.stringify(decodedToken));
   dispatch(setAuthToken(authToken));
   dispatch(setUserData(Userdata));

   dispatch(setAlertMessage("Login successful"));
     
    } else {
      const errorData = await response.json();
      dispatch(setAlertMessage(errorData));
    }
  } catch (error) {
    // console.error("Error:", error);
    dispatch(setAlertMessage("An error occurred"));
  }
  finally {
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
  setAuthToken, clearAuthToken, setUserData, clearUserData, setRegisterationSuccess
} = userSlice.actions;
export default userSlice.reducer;
