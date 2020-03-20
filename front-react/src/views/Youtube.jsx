import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";

const Youtube = () => {
  const [youtubeVideos, setYoutubeVideos] = useState();

  // useEffect(() => {
  //   youtubeVideos = "ivCY3Ec4iaU";
  // }),
  //   [];

  const opts = {
    height: "500",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1
    }
  };

  const _onReady = event => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  return (
    <>
      <div className="youtube-video-container">
        <div className="youtube-video">
          <YouTube videoId={youtubeVideos} opts={opts} onReady={_onReady} />
        </div>
        <div className="youtube-video-buttons-container">
          <button
            onClick={() => setYoutubeVideos("PHe0bXAIuk0")}
            className="youtube-button"
          >
            How The Economy Works - Ray Dalio
          </button>
          <button
            onClick={() => setYoutubeVideos("F3QpgXBtDeo")}
            className="youtube-button"
          >
            How The Stock Market Works - Kurzgesagt
          </button>
          <button
            onClick={() => setYoutubeVideos("Dugn51K_6WA")}
            className="youtube-button"
          >
            Money & Finance - Crash Course
          </button>
          <button
            onClick={() => setYoutubeVideos("EfBSN0xTBo0")}
            className="youtube-button"
          >
            Financial Wisdom - Kevin Hart
          </button>
          <button
            onClick={() => setYoutubeVideos("svbkVpeuwE4")}
            className="youtube-button"
          >
            Compound Interest - Warren Buffet
          </button>
          <button
            onClick={() => setYoutubeVideos("kpjZZBPQvDM")}
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
