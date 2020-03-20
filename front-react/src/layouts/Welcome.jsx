import React from "react";
import Login from "components/Login/Login.jsx";



import "./Welcome.scss"

function Welcome(props) {



  return (
    
    <div>
      <div className='welcome-img-container'>
        <div className='welcome-img'>
        
        <div className='anime'>
        <h1 class="ml3">Take Control Of Your Finances </h1>
        </div>
          
          <div className='login-box'>
            <Login />
          </div>
        
        </div>
      </div>
    </div>
    );  
}


export default Welcome;



