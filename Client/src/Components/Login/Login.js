import React from 'react';
import { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setEmail, setPassword,submitLogin,setEmailError,setPasswordError, setLoading,setAlertMessage} from '../../redux/Userslice'; 
import { Link, } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import './Loginform.css';
  const decodedTokenJSON = localStorage.getItem("decodedToken");
  const isAuthenticated = !!decodedTokenJSON;
function LoginForm() {
  const email = useSelector((state) => state.user.email);
  const password = useSelector((state) => state.user.password);
  const emailError = useSelector((state) => state.user.emailError);
  const passwordError = useSelector((state) => state.user.passwordError);
  const alertMessage = useSelector((state) => state.user.alertmessage);
  const loading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [localAlertMessage, setLocalAlertMessage] = useState("");
  const [localLoading, setLocalLoading] = useState(false);
  const [showpassword, setShowpassword] = useState(false);
  useEffect(() => {
    if (isAuthenticated)
      navigate('/home');
  }, [isAuthenticated]);
   useEffect(() => {
    return () => {
      dispatch(setEmailError(''));
      dispatch(setPasswordError(''));
      dispatch(setEmail(''));
      dispatch(setPassword(''));
      dispatch(setLoading(false));
      dispatch(setAlertMessage(''));
    };
   }, [dispatch]);
  
  useEffect(() => {
    setLocalAlertMessage(alertMessage);
  }, [alertMessage]);
   useEffect(() => {
   
    if (alertMessage === "Login successful") {
      setLocalAlertMessage('');
      navigate('/home');
    }
  }, [alertMessage, navigate]);
   useEffect(() => {
     setLocalLoading(loading);
   }, [loading]);
  
  //  useEffect(() => {
  //    const storedToken = localStorage.getItem("authToken");
  //    if (storedToken) {
  //      dispatch(submitLogin({ token: storedToken }));
  //    }
  //  }, [dispatch]);

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
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      dispatch(setEmail(value)); 
    
    } else if (name === 'password') {
      dispatch(setPassword(value));
     
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formErrors = {
      email: '',
      password: '',
    };
    if (!email) {
      formErrors.email = 'Email is required';
      dispatch(setEmailError('Email is required'));
    } else if (!validateEmail(email)) {
      formErrors.email = 'Please enter a valid email';
      dispatch(setEmailError('Please enter a valid email'));
    }else{
       dispatch(setEmailError(''));
    }

    if (!password) {
    formErrors.password = 'Password is required';
    dispatch(setPasswordError('Password is required'));
  } else if (!validatePassword(password)) {
    formErrors.password = 'Password must be at least 5 characters long';
    dispatch(setPasswordError('Password must be at least 5 characters long'));
  } else {
    dispatch(setPasswordError('')); 
  }

  if (!formErrors.email && !formErrors.password) {
    dispatch(submitLogin({ email, password }));
     dispatch(setEmail(""));
     dispatch(setPassword(""));
  }
  };
  


  return (
    <div  className="container" >
      <div className="form-container">
        <h2 className="form-title">Login Form</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>
              <i className="fas fa-envelope"></i>Email:
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              placeholder='@'/>
            <div className="error-container">
              {emailError && <span className="error">{emailError}</span>}
            </div>
          </div>
          <div className="form-group">
            <label>
              {" "}
              <i className="fas fa-lock"></i>Password:
            </label>
            <div className="password-input-container">
              <input
                type={showpassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => dispatch(setPassword(e.target.value))}/>
              <i
                className={`password-toggle-icon fas ${
                  showpassword ? "fa-eye-slash" : "fa-eye"}`}
                onClick={togglePasswordVisibility}></i>
            </div>
            <div className="error-container">
              {passwordError && <span className="error">{passwordError}</span>}
            </div>
          </div>
          <button
            type="submit"
            className="submit-button"
            disabled={localLoading}>
            {localLoading ? "Logging in..." : "Login"}
          </button>
          {localAlertMessage && (
            <p
              className={`alert ${
                localAlertMessage === "Login successful" ? "success" : "error"}`}>
              {localAlertMessage}
            </p>
          )}
         
          <p>
            Don't have an account?{" "}
            <Link to="/register">
              <span className="register">Register here</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );

}

export default LoginForm;