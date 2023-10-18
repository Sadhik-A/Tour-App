// FormGroup.js
import React, { useState } from "react";
import '../../Pages/Login/Loginform.scss';
// import '../../Pages/RegisterationPage/RegisterationForm.scss'
import './FormGroup.scss'
import eyeimage from '../../assets/eye.svg'
import eyeopen from '../../assets/eyeopen.svg'
function FormGroup({ label, name, value, onChange, placeholder, error,type,required }) {
  const [showpassword, setShowpassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowpassword(!showpassword);
  };
  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="password-input-container">
        {label ==="Description:" ? (
          <textarea className="form-input"
            name={name} value={value} onChange={onChange} placeholder={placeholder}required={required}></textarea>
        ) : (
          <input
            className="form-input"
            type={
              showpassword ? "text" : type === "password" ? "password" : type
            }
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
          />
        )}
        {placeholder === "enter password..." ? (
          <img
            src={showpassword ? eyeopen : eyeimage}
            alt="eye"
            className="password-toggle-icon"
            onClick={togglePasswordVisibility}
          ></img>
        ) : null}
      </div>
      <div className="error-container">
        {error && <span className="error">{error}</span>}
      </div>
    </div>
  );
}

export default FormGroup;
