import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./Pages/Login/Login";
import RegistrationForm from "./Pages/RegisterationPage/RegistertionForm";
import Homepage from "./Pages/Homepage/Homepage";
import Addbook from "./Pages/AddTour/AddTour";
import EditTourForm from "./Pages/EditTour/EditTourForm";
import PrivateRoute from "../src/Components/PrivateRoute";
import LandingPage from "./Pages/LandingPage/LandingPage";
import ProfilePage from "./Pages/Profile/ProfilePage";
import DescriptionPage from "./Pages/DescriptionPage/DescriptionPage";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import EmailRedirect from "./Pages/EmailRedirectPage/EmailRedirect";
import { useDispatch } from "react-redux";
import {
  getTour, 
} from "./redux/Tourslice";
import Redirect from "./Pages/Redirect/Redirect";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTour());
  },[dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/email-verified" element={<EmailRedirect />} />
        <Route path="/redirect" element={<Redirect />} />
        <Route
          path="/"
          element={<PrivateRoute path="/" element={<LoginForm />} />}
        />
        <Route
          path="/home"
          element={<PrivateRoute path="/home" element={<Homepage />} />}
        />
        <Route
          path="/addTour"
          element={<PrivateRoute path="/addTour" element={<Addbook />} />}
        />
        <Route
          path="/editTour/:tourid"
          element={
            <PrivateRoute path="/editTour/:tourid" element={<EditTourForm />} />
          }
        />
        <Route
          path="/landing"
          element={<PrivateRoute path="/landing" element={<LandingPage />} />}
        />
        <Route
          path="/profile"
          element={<PrivateRoute path="/profile" element={<ProfilePage />} />}
        />
        <Route
          path="/description/:tourid"
          element={
            <PrivateRoute
              path="/description/:tourid"
              element={<DescriptionPage />}
            />
          }
        />
        <Route
          path="/admin"
          element={<PrivateRoute path="/admin" element={<AdminDashboard />} />}
        />
      </Routes>
    </BrowserRouter>
  );
    added new featueres
}
export default App;
