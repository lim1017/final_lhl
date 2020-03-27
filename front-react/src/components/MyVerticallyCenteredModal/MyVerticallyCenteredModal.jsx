import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import MUButton from "@material-ui/core/Button";

function MyVerticallyCenteredModal(props) {
  const [button1, setButton1] = useState({
    color: "linear-gradient(45deg, #ec407a 30%, #f48fb1 90%)",
    x: 0
  });

  const style = {
    background: "linear-gradient(45deg, #ec407a 30%, #f48fb1 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 35,
    width: 80,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px #4a148c 30%",
    marginLeft: 0
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
          Question Time!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.content}</p>
      </Modal.Body>
      <Modal.Footer>
        {props.allAnswers[`${props.id}`] === 0 &&
        props.answerYet[`${props.id}`] === true ? (
          <p>Sorry try again</p>
        ) : null}

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
          onClick={props.onHide}
        >
          Cancel
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
          onClick={() => {
            props.verifyAnswer(props.id);
          }}
        >
          Submit
        </MUButton>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
