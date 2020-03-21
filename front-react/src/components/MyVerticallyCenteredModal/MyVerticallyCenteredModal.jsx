import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import Button from '@material-ui/core/Button';
import QuizQuestion from "components/QuizQuestion/QuizQuestion.jsx";
import { articles } from "variables/EducationArticles.jsx";
import appDataContext from "../../hooks/reducers/useContext";



function MyVerticallyCenteredModal(props) {

 

  const [incorrect, setIncorrect] = React.useState(false);
  const { state, dispatch } = useContext(appDataContext);


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
        <h4>Centered Modal</h4>
        <p>
          {props.content}
        </p>
      </Modal.Body>
      <Modal.Footer>

      {props.allAnswers[`${props.id}`]==0 && props.answerYet[`${props.id}`]==true  ? (
            <p>Sorry try again</p>
                  ) : null}

        <Button variant="contained" 
                color="primary"  
                onClick={props.onHide}
        >
        Cancel</Button>
        
        <Button variant="contained" 
                color="primary"  
                onClick={()=>{
                  props.verifyAnswer(props.id)
                  setIncorrect(true)
                }}
                style={{marginLeft:'2rem'}}
        >
        Submit</Button>      
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
