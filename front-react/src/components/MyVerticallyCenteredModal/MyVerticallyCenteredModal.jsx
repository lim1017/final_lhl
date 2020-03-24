import React from "react";
import { Modal } from "react-bootstrap";
import Button from '@material-ui/core/Button';



function MyVerticallyCenteredModal(props) {

 



  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Question Time!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {props.content}
        </p>
      </Modal.Body>
      <Modal.Footer>

      {props.allAnswers[`${props.id}`]===0 && props.answerYet[`${props.id}`]===true  ? (
            <p>Sorry try again</p>
                  ) : null}

        <Button 
                style={{ 
                  marginTop:'1rem',
                  backgroundColor:"#c4d2c7",
                  color:'black',
                  fontWeight:'bold',
                  height:'30px'
                  }}
                variant="contained" 
                color="primary"  
                onClick={props.onHide}
        >
        Cancel</Button>
        
        <Button 
                style={{ 
                  marginTop:'1rem',
                  backgroundColor:"#c4d2c7",
                  color:'black',
                  fontWeight:'bold',
                  height:'30px',
                  marginLeft:'2rem'
                  }}
                variant="contained" 
                color="primary"  
                onClick={()=>{
                  props.verifyAnswer(props.id)
                  
                }}
                
        >
        Submit</Button>      
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
