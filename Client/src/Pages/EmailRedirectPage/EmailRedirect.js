import React from 'react'
import {  Link } from "react-router-dom";
function EmailRedirect() {
  return (
    <>
        <div className="container">
          <h1>Email verified successfully</h1>
          <Link to="/">
            <button>Login</button>
          </Link>
        </div>
      
    </>
  );
}

export default EmailRedirect