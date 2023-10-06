import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginForm from "./Components/Login/Login";
import RegistrationForm from "./Components/RegisterationPage/RegistertionForm";
import Homepage from "./Components/Homepage/Homepage";
import Addbook from "./Components/AddTour/AddTour";
import EditTourForm from "./Components/EditTour/EditTourForm";
import PrivateRoute from "../src/Components/PrivateRoute"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/" element={<LoginForm />}/>
        <Route path="/home" element={<PrivateRoute element={<Homepage />} />} />
        <Route path="/addTour"element={<PrivateRoute element={<Addbook />} />}/>
        <Route path="/editTour/:tourid"element={<PrivateRoute element={<EditTourForm />} />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
