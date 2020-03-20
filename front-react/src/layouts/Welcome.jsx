import React, { useState } from "react";
import Login from "components/Login/Login.jsx";

import "./Welcome.scss"

function Welcome(props) {


  return (
    <div>
      <div className='welcome-img-container'>
        <div className='welcome-img'>
          <Login />
        </div>
      </div>
    </div>
    );  
}


export default Welcome;



