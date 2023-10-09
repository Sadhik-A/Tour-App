// FormGroup.js
import React, { useState } from "react";
import '../../Pages/Login/Loginform.css';
import '../../Pages/RegisterationPage/RegisterationForm.css'
function FormGroup({ label, name, value, onChange, placeholder, error,type,required }) {
  const [showpassword, setShowpassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowpassword(!showpassword);
  };
  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="password-input-container">
        <input
          type={showpassword ? "text" : type === "password" ? "password" : type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
        {placeholder === "Password" ? (
          <i
            className={`password-toggle-icon fas ${
              showpassword ? "fa-eye-slash" : "fa-eye"
            }`}
            onClick={togglePasswordVisibility}
          ></i>
        ) : null}
      </div>
      <div className="error-container">
        {error && <span className="error">{error}</span>}
      </div>
    </div>
  );
}

export default FormGroup;
