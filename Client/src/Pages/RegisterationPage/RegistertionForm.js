import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormGroup from "../../Components/FormGroup/FormGroup";

import {
  setEmail,
  setPassword,
  submitRegistration,
  setEmailError,
  setPasswordError,
  setConfirmPassword,
  setLoading,
  setAlertMessage,
  setRegisterationSuccess,
  setUsername,
} from "../../redux/Userslice";
import "../Login/Loginform.scss";
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
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [localAlertMessage, setLocalAlertMessage] = useState("");
  const [localLoading, setLocalLoading] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(setEmailError(""));
      dispatch(setPasswordError(""));
      dispatch(setUsername(""));
      dispatch(setEmail(""));
      dispatch(setPassword(""));
      dispatch(setConfirmPassword(""));
      dispatch(setLoading(false));
      dispatch(setAlertMessage(""));
      dispatch(setUsername(""));
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
     }, 5000);
   }
 }, [alertMessage]);
 
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 5;
  };
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      if (name === "email") {
        dispatch(setEmail(value));
      } else if (name === "password") {
        dispatch(setPassword(value));
      } else if (name === "confirmPassword")
      {
        dispatch(setConfirmPassword(value));
      }
      else if (name === "username")
      {
        dispatch(setUsername(value));
      }
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
      dispatch(submitRegistration({ email, password,username }));
       dispatch(setEmail(""));
       dispatch(setPassword(""));
       dispatch(setConfirmPassword(""));
    }
  };
  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Sign up </h2>
        <h2 className="form-subtitle">
          Enter your credentials to access your account
        </h2>
        <form onSubmit={handleSubmit} className="form">
          <FormGroup
            label={"Username"}
            type={"text"}
            name="username"
            value={username}
            onChange={handleInputChange}
            placeholder="enter username.."
            required={true}
          />
          <FormGroup
            label={"Email"}
            type={"email"}
            name="email"
            value={email}
            onChange={handleInputChange}
            placeholder="enter email.."
            error={emailError}
          />
          <FormGroup
            label={"Password"}
            type={"password"}
            name="password"
            value={password}
            onChange={handleInputChange}
            error={passwordError}
            placeholder="enter password..."
          />
          <FormGroup
            label={"Confirm Password"}
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleInputChange}
            error={passwordError}
            type={"password"}
            placeholder="enter password..."
          />
          <button
            type="submit"
            className="submit-button"
            disabled={localLoading}
          >
            {localLoading ? "Registering..." : "Register"}
          </button>
          {isAlertVisible && (
            <p
              className={`alert ${
                localAlertMessage === "User registered successfully" ||
                "complete registration using the link sent to your email"
                  ? "success"
                  : "error"
              }`}
            >
              {localAlertMessage}
            </p>
          )}
          <p>
            Already have an account?{" "}
            <Link to="/" className="link">
              <span className="register">Login here</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
