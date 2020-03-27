import React, { useState } from "react";
import MUButton from "@material-ui/core/Button";

function FileUpload(props) {
  const [fileName, setFileName] = useState(null);
  const [fileTypeError, setFileTypeError] = useState(false);

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
    width: 105,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px #4a148c 30%",
    marginLeft: 0
  };

  return (
    <div>
      <div className="file-upload">
        <label style={{ marginBottom: "0" }}>
          <div
            type="button"
            className="btn"
            style={{
              background: "linear-gradient(45deg, #ec407a 30%, #f48fb1 90%)",
              borderRadius: 3,
              border: 0,
              color: "white",
              height: 40,
              width: 105,
              padding: "5px 30px",
              boxShadow: "0 3px 5px 2px #4a148c 30%",
              marginLeft: 0,
              marginBottom: "15px",
              fontSize: 11
            }}
          >
            Select File
          </div>
          <input
            className="file-upload-btn"
            type="file"
            name="file"
            style={{ display: "none" }}
            onChange={e => {
              if (e.target.files[0].name.includes(".csv")) {
                setFileTypeError(false);
                setFileName(e.target.files[0].name);
                props.handleFile(e);
              } else {
                setFileTypeError(true);
              }
            }}
          />
        </label>
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
          onClick={() => {
            props.sendFileBack();
            setFileName(null);
          }}
        >
          Upload File
        </MUButton>
      </div>
      {fileTypeError ? (
        <div style={{ color: "red" }}>Please upload a .csv</div>
      ) : null}

      <div>{fileName}</div>
    </div>
  );
}


export default FileUpload;
