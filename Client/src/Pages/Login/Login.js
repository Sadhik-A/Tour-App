import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Google from "../../assets/google.svg";
import Github from "../../assets/github.png";
import { SERVER_URLS } from "../../utils/config";
// import jwt_decode from "jwt-decode";
// import axios from "axios";
import {
  setEmail,
  setPassword,
  submitLogin,
  setEmailError,
  setPasswordError,
  setLoading,
  setAlertMessage,
} from "../../redux/Userslice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Loginform.scss";
import FormGroup from "../../Components/FormGroup/FormGroup";
function LoginForm() {
  const email = useSelector((state) => state.user.email);
  const password = useSelector((state) => state.user.password);
  const emailError = useSelector((state) => state.user.emailError);
  const passwordError = useSelector((state) => state.user.passwordError);
  const alertMessage = useSelector((state) => state.user.alertmessage);
  const loading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [localAlertMessage, setLocalAlertMessage] = useState("");
  const [localLoading, setLocalLoading] = useState(false);
  useEffect(() => {
    return () => {
      dispatch(setEmailError(""));
      dispatch(setPasswordError(""));
      dispatch(setEmail(""));
      dispatch(setPassword(""));
      dispatch(setLoading(false));
      dispatch(setAlertMessage(""));
    };
  }, [dispatch]);
  useEffect(() => {
    setLocalAlertMessage(alertMessage);
  }, [alertMessage]);
  useEffect(() => {
    if (alertMessage === "Logged in successfully") {
      setLocalAlertMessage("");
      navigate("/landing");
    }
   else if (alertMessage === "Admin logged in successfully") {
     setLocalAlertMessage("");
     navigate("/admin");
   }
  }, [alertMessage, navigate]);
  useEffect(() => {
    setLocalLoading(loading);
  }, [loading]);

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
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formErrors = {
      email: "",
      password: "",
    };
    if (!email) {
      formErrors.email = "Email is required";
      dispatch(setEmailError("Email is required"));
    } else if (!validateEmail(email)) {
      formErrors.email = "Please enter a valid email";
      dispatch(setEmailError("Please enter a valid email"));
    } else {
      dispatch(setEmailError(""));
    }

    if (!password) {
      formErrors.password = "Password is required";
      dispatch(setPasswordError("Password is required"));
    } else if (!validatePassword(password)) {
      formErrors.password = "Password must be at least 5 characters long";
      dispatch(setPasswordError("Password must be at least 5 characters long"));
    } else {
      dispatch(setPasswordError(""));
    }

    if (!formErrors.email && !formErrors.password) {
      dispatch(submitLogin({ email, password }));
      dispatch(setEmail(""));
      dispatch(setPassword(""));
    }
  };
  const HandlegoogleLogin = () => {
    window.open(`${SERVER_URLS.production}/auth/google`, "_self");
  };
  const HandlegithubLogin = () => {
    window.open(`${SERVER_URLS.production}/auth/github`, "_self");
  };
  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Log in to your account </h2>
        <h2 className="form-subtitle">Welcome back ! </h2>
        <div className="social-login">
          <div className="social-icons">
            <div className="google-icon">
              <img
                src={Google}
                alt="circle"
                className="circle"
                onClick={() => HandlegoogleLogin()}
              />
            </div>
            <div className="google-icon">
              <img
                src={Github}
                alt="circle"
                className="circle"
                onClick={() => HandlegithubLogin()}
              />
            </div>
          </div>
          <p>Sign in with Google or GitHub</p>
        </div>
        <form onSubmit={handleSubmit}>
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
            onChange={(e) => dispatch(setPassword(e.target.value))}
            placeholder="enter password..."
            error={passwordError}
          />
          <button
            type="submit"
            className="submit-button"
            disabled={localLoading}
          >
            {localLoading ? "Logging in..." : "Log In"}
          </button>
          {localAlertMessage && (
            <p
              className={`alert ${
                localAlertMessage === "Logged in successfully" ||
                "complete registration using the link sent to your email"
                  ? "success"
                  : "error"
              }`}
            >
              {localAlertMessage}
            </p>
          )}

          <p>
            Don't have an account?{" "}
            <Link to="/register" className="link">
              <span className="register" style={{ textDecoration: "none" }}>
                SignUp
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
