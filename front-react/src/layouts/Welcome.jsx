import React from "react";
import Login from "components/Login/Login.jsx";
import ReactPlayer from "react-player";
import myVideo from "../assets/img/WelcomeVideo2.mp4";

import "./Welcome.scss";

function Welcome(props) {
  return (
    <>
      <div className="welcome-outter-container">
        <div className="welcome-outter-div">
          <div className="welcome-title-container">
            <div className="welcome-title">
              <div className="welcome-title-text">
                Invest in You | PiggyBank
              </div>
            </div>
            <div className="login-box">
              <Login />
            </div>
          </div>
        </div>
        <div className="video-wrapper">
          <ReactPlayer
            className="react-player"
            url={myVideo}
            width="100%"
            height="100%"
            playing={true}
            loop={true}
            playsinline={true}
            muted={true}
          />
        </div>
      </div>
    </>
  );
}

export default Welcome;
