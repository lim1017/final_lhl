import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import MUButton from '@material-ui/core/Button';


function MyVerticallyCenteredModal2(props) {

  const [button1, setButton1] = useState({color: 'linear-gradient(45deg, #ec407a 30%, #f48fb1 90%)', x: 0});

  const style = {
    background: 'linear-gradient(45deg, #ec407a 30%, #f48fb1 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 40,
    width: 105,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px #4a148c 30%',
    marginLeft: 0,
  };


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
        <h4>There are two ways to add an expense.</h4>
        <p>
          <ul>
            <li>Add a single expense with the "Add AN EXPENSE" Button</li>
            <li>Upload a .csv file with the "SELECT FILE" BUTTON</li>
            <li>We have provided a sample .csv to use. <a href="https://drive.google.com/file/d/1xqcGAqk7qfDCBEPKig7mu_Zk-WXh8aph/view" target="_blank">Sample .csv </a> </li>
          </ul>
        </p>
      </Modal.Body>
      <Modal.Footer>
      <MUButton
         style={{
          ...style,
          background: button1.color,
          marginRight:'1em',
          marginLeft:'1em',
          marginTop:'4px'
        }}
          onMouseLeave={() => setButton1({
            ...button1,
            color: 'linear-gradient(45deg, #ec407a 30%, #f48fb1 90%)'
          })}
          onMouseOver={() => setButton1({
            ...button1,
            color: 'linear-gradient(45deg, #f06292 30%, #f8bbd0 90%)'
          })}
          onMouseUp={() => setButton1({
            ...button1,
            x: 0
          })}
          onMouseDown={() => setButton1({
            ...button1,
            x: 2
          })}
                onClick={props.onHide}
                
        >
        Close</MUButton>      
      
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal2;
