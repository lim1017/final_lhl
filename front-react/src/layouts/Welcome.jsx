import React from "react";
import Login from "components/Login/Login.jsx";
import ReactPlayer from "react-player";
import myVideo from "../assets/img/WelcomeVideo.mp4";

import "./Welcome.scss";

function Welcome(props) {
  return (
    <>
      <div className="welcome-outter-container">
        <div className="anime">
          <h1 className="ml3">Take Control Of Your Finances with PiggyBank </h1>
        </div>
        <div className="login-box">
          <Login />
        </div>
        <div className="video-wrapper">
          <ReactPlayer
            className="react-player"
            url={myVideo}
            width="100%"
            height="100%"
            playing={true}
            loop={true}
            controls={true}
          />
        </div>
      </div>
    </>
  );
}

export default Welcome;
