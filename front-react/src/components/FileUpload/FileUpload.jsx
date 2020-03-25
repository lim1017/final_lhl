import React, { useState } from "react";
import Button from "@material-ui/core/Button";

function FileUpload(props) {
  const [fileName, setFileName] = useState(null);
  const [fileTypeError, setFileTypeError] = useState(false);

  return (
    <div>
      <div className="file-upload">
        <label style={{ marginBottom: "0" }}>
          <div
            type="button"
            className="btn btn-success btn-block select-btn"
            style={{ height: "50px" }}
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
        <Button
          style={{
            marginLeft: "1.5rem",
            marginRight: "1.5em",
            backgroundColor: "#c4d2c7",
            color: "black",
            fontWeight: "bold",
            height: "50px"
          }}
          variant="contained"
          color="primary"
          onClick={() => {
            props.sendFileBack();
            setFileName(null);
          }}
        >
          Upload File
        </Button>
        {/* <button type="button" className="btn btn-success btn-block upload-btn" onClick={()=>{
         props.sendFileBack()
         setFileName(null) 
        }}>Upload</button>  */}
      </div>
      {fileTypeError ? (
        <div style={{ color: "red" }}>Please upload a .csv</div>
      ) : null}

      <div>{fileName}</div>
    </div>
  );
}

// class FileUpload extends React.Component{
//   constructor(props){
//     super(props);
//     this.myRef= React.createRef()
//   }

//   render() {

//     return (
//       <div className='file-upload'>

//         <button type="button" class="btn btn-success btn-block" onClick={()=>{handleClick()}}>Select File</button>
//         {showFile ? (
//                   <input ref={input => this.inputElement = input}  className='file-upload-btn' type="file" name="file" onChange={props.handleFile}/>
//                     ) : null}

//         <button type="button" class="btn btn-success btn-block" onClick={props.sendFileBack}>Upload</button>
//       </div>
//     );

//   }

//   function handleClick(){
//     this.inputElement.click();
//   }
// }

export default FileUpload;
