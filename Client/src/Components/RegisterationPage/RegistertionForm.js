import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


import {
  setEmail,
  setPassword,
  submitRegistration,
  setEmailError,
  setPasswordError,
  setConfirmPassword,
  setLoading,
  setAlertMessage,
  setRegisterationSuccess
} from "../../redux/Userslice";
import "./RegisterationForm.css";
import { Link } from "react-router-dom";

function RegistrationForm() {
  const email = useSelector((state)  => state.user.email);
  const password = useSelector((state) => state.user.password);
  const emailError = useSelector((state) => state.user.emailError);
  const passwordError = useSelector((state) => state.user.passwordError);
  const confirmPassword = useSelector((state) => state.user.confirmpassword);
  const loading = useSelector((state) => state.user.loading);
  const alertMessage = useSelector((state) => state.user.alertmessage);
  const registrationSuccess = useSelector((state) => state.user.registerationSuccess);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [localAlertMessage, setLocalAlertMessage] = useState("");
  const [localLoading, setLocalLoading] = useState(false);
  const [showpassword, setShowpassword] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(setEmailError(""));
      dispatch(setPasswordError(""));
      dispatch(setEmail(""));
      dispatch(setPassword(""));
      dispatch(setConfirmPassword(""));
      dispatch(setLoading(false));
      dispatch(setAlertMessage(""));
    };
  }, [dispatch]);
 useEffect(() => {
   if (registrationSuccess) {
     setTimeout(() => {
       navigate("/");
       dispatch(setRegisterationSuccess(false));
     }, 2000); 
   }
 }, [registrationSuccess, navigate, dispatch]);

  useEffect(() => {
    setLocalAlertMessage(alertMessage);
  }, [alertMessage]);

  useEffect(() => {
    setLocalLoading(loading);
  }, [loading]);
 useEffect(() => {
   if (alertMessage) {
     setIsAlertVisible(true);
     setTimeout(() => {
       setIsAlertVisible(false);
     }, 1000);
   }
 }, [alertMessage]);
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 5;
  };
  const togglePasswordVisibility = () => {
    setShowpassword(!showpassword);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let formErrors = {
      email: "",
      password: "",
      confirmPassword: "", 
    };

    if (!email) {
      formErrors.email = "Email is required";
      dispatch(setEmailError("Email is required"));
    } else if (!validateEmail(email)) {
      formErrors.email = "Please enter a valid email";
      dispatch(setEmailError("Please enter a valid email"));
    }

    if (!password) {
      formErrors.password = "Password is required";
      dispatch(setPasswordError("Password is required"));
    } else if (!validatePassword(password)) {
      formErrors.password = "Password must be at least 5 characters long";
      dispatch(setPasswordError("Password must be at least 5 characters long"));
    }

    if (password !== confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match";
      dispatch(setPasswordError("Passwords do not match"));
    } else {
      dispatch(setPasswordError("")); 
    }

    if (
      !formErrors.email &&
      !formErrors.password &&
      !formErrors.confirmPassword
    ) {
      dispatch(submitRegistration({ email, password }));
       dispatch(setEmail(""));
       dispatch(setPassword(""));
       dispatch(setConfirmPassword(""));
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Registration Form</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>
              <i className="fas fa-envelope"></i>Email:
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
              placeholder="@"
            />
            <div className="error-container">
              {emailError && <span className="error">{emailError}</span>}
            </div>
          </div>
          <div className="form-group">
            <label>
              <i className="fas fa-lock"></i> Password:
            </label>
            <div className="password-input-container">
              <input
                type={showpassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => dispatch(setPassword(e.target.value))}
              />
              <i
                className={`password-toggle-icon fas ${
                  showpassword ? "fa-eye-slash" : "fa-eye"
                }`}
                onClick={togglePasswordVisibility}
              ></i>
            </div>
          </div>
          <div className="form-group">
            <label>
              <i className="fas fa-lock"></i> Confirm Password:
            </label>
            <div className="password-input-container">
              <input
                type={showpassword ? "text" : "password"}
                name="password"
                value={confirmPassword}
                onChange={(e) => dispatch(setConfirmPassword(e.target.value))}/>
              <i
                className={`password-toggle-icon fas ${
                  showpassword ? "fa-eye-slash" : "fa-eye" }`}
                onClick={togglePasswordVisibility}>
              </i>
            </div>
            <div className="error-container">
              {passwordError && <span className="error">{passwordError}</span>}
            </div>
          </div>
          <button
            type="submit"
            className="submit-button"
            disabled={localLoading}>
            {localLoading ? "Registering..." : "Register"}
          </button>
          {isAlertVisible&& (
            <p
              className={`alert ${
                localAlertMessage === "registeration successful" ? "success": "error" }`}>
              {localAlertMessage}
            </p>
          )}
          <p>
            Already have an account?{" "}
            <Link to="/">
              <span className="register">Login here</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
