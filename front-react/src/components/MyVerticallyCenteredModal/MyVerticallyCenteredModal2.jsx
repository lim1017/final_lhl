import React from "react";
import { Modal } from "react-bootstrap";
import Button from '@material-ui/core/Button';


function MyVerticallyCenteredModal2(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Adding Expenses
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4></h4>
        <p>
          There are two ways to add an expense.
          <ul>
            <li>Add a single expense with the "Add AN EXPENSE" Button</li>
            <li>Upload a .csv file with the "SELECT FILE" BUTTON</li>
            <li>We have provided a sample .csv to use. <a href="https://drive.google.com/file/d/1xqcGAqk7qfDCBEPKig7mu_Zk-WXh8aph/view" target="_blank">Sample .csv </a> </li>
          </ul>
        </p>
      </Modal.Body>
      <Modal.Footer>
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
                onClick={props.onHide}
                
        >
        Close</Button>      
      
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal2;
