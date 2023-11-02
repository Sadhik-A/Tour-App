import React from 'react'
import { Link } from "react-router-dom";
import email from "../../assets/emailicon.svg";
import "./EmailRedirect.scss"
function EmailRedirect() {
  return (
    <>
      <div className="main-container">
        <div className="email-redirect">
          <div className="mail">
            <img src={email} alt="circle" className="circle" />
          </div>
          <div className="text-button">
            <div className="text">
              <h2> Email Verified !</h2>
              <p>You have successfully verified account. </p>
            </div>
             <Link to="/" className='link'>
            <div className="button">
              <p>Continue </p>
            </div> </Link>
          </div>  
        </div>
      </div>
    </>
  );
}

export default EmailRedirect