import React, { useState } from "react";
import YouTube from "react-youtube";
import MUButton from "@material-ui/core/Button";

const Youtube = () => {
  const [button1, setButton1] = useState({
    color: "linear-gradient(45deg, #ec407a 30%, #f48fb1 90%)",
    x: 0
  });

  const style = {
    background: "linear-gradient(45deg, #ec407a 30%, #f48fb1 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 40,
    width: 163,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px #4a148c 30%",
    marginLeft: 0
  };

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
      <div className="youtube-review-container">
        <div className="youtube-video-container">
          <div className="youtube-video">
            <YouTube videoId={youtubeVideo} opts={opts} onReady={_onReady} />
          </div>
          <div className="youtube-video-buttons-container">
            <MUButton
              style={{
                ...style,
                background: button1.color,
                marginRight: "1em",
                marginLeft: "1em",
                marginTop: "4px"
              }}
              onMouseLeave={() =>
                setButton1({
                  ...button1,
                  color: "linear-gradient(45deg, #ec407a 30%, #f48fb1 90%)"
                })
              }
              onMouseOver={() =>
                setButton1({
                  ...button1,
                  color: "linear-gradient(45deg, #f06292 30%, #f8bbd0 90%)"
                })
              }
              onMouseUp={() =>
                setButton1({
                  ...button1,
                  x: 0
                })
              }
              onMouseDown={() =>
                setButton1({
                  ...button1,
                  x: 2
                })
              }
              onClick={() => setYoutubeVideo("PHe0bXAIuk0")}
              className="youtube-button"
            >
              How The Economy Works - Ray Dalio
            </MUButton>
            <MUButton
              style={{
                ...style,
                background: button1.color,
                marginRight: "1em",
                marginLeft: "1em",
                marginTop: "4px"
              }}
              onMouseLeave={() =>
                setButton1({
                  ...button1,
                  color: "linear-gradient(45deg, #ec407a 30%, #f48fb1 90%)"
                })
              }
              onMouseOver={() =>
                setButton1({
                  ...button1,
                  color: "linear-gradient(45deg, #f06292 30%, #f8bbd0 90%)"
                })
              }
              onMouseUp={() =>
                setButton1({
                  ...button1,
                  x: 0
                })
              }
              onMouseDown={() =>
                setButton1({
                  ...button1,
                  x: 2
                })
              }
              onClick={() => setYoutubeVideo("F3QpgXBtDeo")}
              className="youtube-button"
            >
              How The Stock Market Works
            </MUButton>
            <MUButton
              style={{
                ...style,
                background: button1.color,
                marginRight: "1em",
                marginLeft: "1em",
                marginTop: "4px"
              }}
              onMouseLeave={() =>
                setButton1({
                  ...button1,
                  color: "linear-gradient(45deg, #ec407a 30%, #f48fb1 90%)"
                })
              }
              onMouseOver={() =>
                setButton1({
                  ...button1,
                  color: "linear-gradient(45deg, #f06292 30%, #f8bbd0 90%)"
                })
              }
              onMouseUp={() =>
                setButton1({
                  ...button1,
                  x: 0
                })
              }
              onMouseDown={() =>
                setButton1({
                  ...button1,
                  x: 2
                })
              }
              onClick={() => setYoutubeVideo("Dugn51K_6WA")}
              className="youtube-button"
            >
              Money & Finance - Crash Course
            </MUButton>
            <MUButton
              style={{
                ...style,
                background: button1.color,
                marginRight: "1em",
                marginLeft: "1em",
                marginTop: "4px"
              }}
              onMouseLeave={() =>
                setButton1({
                  ...button1,
                  color: "linear-gradient(45deg, #ec407a 30%, #f48fb1 90%)"
                })
              }
              onMouseOver={() =>
                setButton1({
                  ...button1,
                  color: "linear-gradient(45deg, #f06292 30%, #f8bbd0 90%)"
                })
              }
              onMouseUp={() =>
                setButton1({
                  ...button1,
                  x: 0
                })
              }
              onMouseDown={() =>
                setButton1({
                  ...button1,
                  x: 2
                })
              }
              onClick={() => setYoutubeVideo("EfBSN0xTBo0")}
              className="youtube-button"
            >
              Financial Wisdom - Kevin Hart
            </MUButton>
            <MUButton
              style={{
                ...style,
                background: button1.color,
                marginRight: "1em",
                marginLeft: "1em",
                marginTop: "4px"
              }}
              onMouseLeave={() =>
                setButton1({
                  ...button1,
                  color: "linear-gradient(45deg, #ec407a 30%, #f48fb1 90%)"
                })
              }
              onMouseOver={() =>
                setButton1({
                  ...button1,
                  color: "linear-gradient(45deg, #f06292 30%, #f8bbd0 90%)"
                })
              }
              onMouseUp={() =>
                setButton1({
                  ...button1,
                  x: 0
                })
              }
              onMouseDown={() =>
                setButton1({
                  ...button1,
                  x: 2
                })
              }
              onClick={() => setYoutubeVideo("svbkVpeuwE4")}
              className="youtube-button"
            >
              Compound Interest - Warren Buffet
            </MUButton>
            <MUButton
              style={{
                ...style,
                background: button1.color,
                marginRight: "1em",
                marginLeft: "1em",
                marginTop: "4px"
              }}
              onMouseLeave={() =>
                setButton1({
                  ...button1,
                  color: "linear-gradient(45deg, #ec407a 30%, #f48fb1 90%)"
                })
              }
              onMouseOver={() =>
                setButton1({
                  ...button1,
                  color: "linear-gradient(45deg, #f06292 30%, #f8bbd0 90%)"
                })
              }
              onMouseUp={() =>
                setButton1({
                  ...button1,
                  x: 0
                })
              }
              onMouseDown={() =>
                setButton1({
                  ...button1,
                  x: 2
                })
              }
              onClick={() => setYoutubeVideo("kpjZZBPQvDM")}
              className="youtube-button"
            >
              Financial Advice - Tony Robbins
            </MUButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default Youtube;
