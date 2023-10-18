import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./Pages/Login/Login";
import RegistrationForm from "./Pages/RegisterationPage/RegistertionForm";
import Homepage from "./Pages/Homepage/Homepage";
import Addbook from "./Pages/AddTour/AddTour";
import EditTourForm from "./Pages/EditTour/EditTourForm";
import PrivateRoute from "../src/Components/PrivateRoute";
import LandingPage from "./Pages/LandingPage/LandingPage";
import ProfilePage from "./Pages/Profile/ProfilePage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
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
          element={<PrivateRoute path="/profile" element={<ProfilePage/>} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
