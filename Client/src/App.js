import LoginForm from "./Components/Login/Login";
import RegistrationForm from "./Components/RegisterationPage/RegistertionForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Components/Homepage/Homepage";
import React from "react";
import Addbook from "./Components/AddTour/AddTour";
import EditTourForm from "./Components/EditTour/EditTourForm";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/addTour" element={<Addbook />} />
        <Route path="/editTour/:tourid" element={<EditTourForm />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
