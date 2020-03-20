import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";

const Youtube = () => {
  const [youtubeVideo, setYoutubeVideo] = useState("PZBWI5vz2Hg");

  const opts = {
    height: "500",
    width: "100%",
    playerVars: {
      autoplay: 1
    }
  };

  const _onReady = event => {
    event.target.pauseVideo();
  };

  return (
    <>
      <div className="youtube-video-container">
        <div className="youtube-video">
          <YouTube videoId={youtubeVideo} opts={opts} onReady={_onReady} />
        </div>
        <div className="youtube-video-buttons-container">
          <button
            onClick={() => setYoutubeVideo("PHe0bXAIuk0")}
            className="youtube-button"
          >
            How The Economy Works - Ray Dalio
          </button>
          <button
            onClick={() => setYoutubeVideo("F3QpgXBtDeo")}
            className="youtube-button"
          >
            How The Stock Market Works - Kurzgesagt
          </button>
          <button
            onClick={() => setYoutubeVideo("Dugn51K_6WA")}
            className="youtube-button"
          >
            Money & Finance - Crash Course
          </button>
          <button
            onClick={() => setYoutubeVideo("EfBSN0xTBo0")}
            className="youtube-button"
          >
            Financial Wisdom - Kevin Hart
          </button>
          <button
            onClick={() => setYoutubeVideo("svbkVpeuwE4")}
            className="youtube-button"
          >
            Compound Interest - Warren Buffet
          </button>
          <button
            onClick={() => setYoutubeVideo("kpjZZBPQvDM")}
            className="youtube-button"
          >
            Financial Advice - Tony Robbins
          </button>
        </div>
      </div>
    </>
  );
};

export default Youtube;
