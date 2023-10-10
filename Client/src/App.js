import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./Pages/Login/Login";
import RegistrationForm from "./Pages/RegisterationPage/RegistertionForm";
import Homepage from "./Pages/Homepage/Homepage";
import Addbook from "./Pages/AddTour/AddTour";
import EditTourForm from "./Pages/EditTour/EditTourForm";
import PrivateRoute from "../src/Components/PrivateRoute";

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
        
      </Routes>
    </BrowserRouter>
  );
}
export default App;
