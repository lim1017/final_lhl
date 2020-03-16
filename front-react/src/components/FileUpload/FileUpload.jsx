import React from "react";

function FileUpload(props) {

  

  return (
    <div>
      
      <input type="file" name="file" onChange={props.handleFile}/>
      <button type="button" class="btn btn-success btn-block" onClick={props.sendFileBack}>Upload</button> 
    </div>
  );
}

export default FileUpload;
