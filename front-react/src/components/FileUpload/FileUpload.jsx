import React, { useState } from "react";

function FileUpload(props) {

  const [fileName, setFileName] = useState(null);

  const handleClick = (e) => {
    this.inputElement.click();
  }

  return (
    <div>
      <div className='file-upload'>
        
        <label style={{marginBottom:'0'}}>
        <div type="button" className="btn btn-success btn-block">Select File</div>
                  <input className='file-upload-btn' type="file" name="file" style={{display:"none"}} onChange={(e)=>{
                    setFileName(e.target.files[0].name)
                    props.handleFile(e)
                    }}/>
        </label>
        <button type="button" className="btn btn-success btn-block upload-btn" onClick={props.sendFileBack}>Upload</button> 
      </div>
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
