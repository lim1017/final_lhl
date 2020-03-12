import React, { useState } from "react";
import CustomButton from "../CustomButton/CustomButton";

export default function Form(props) {
  const [name, setName] = useState(props.name || "")
  const [type, setType] = useState(props.type || "")
  const [description, setDescription] = useState(props.description || "")

  const typeCheck = function(value) {
    if (value !== type) {
      console.log(value)
      setType(value)
    }
  }

  const validate = function() {
    // if (name === "") {
    //   setError("Student name cannot be blank");
    //   return;
    // }

    // setError("");
    // props.onSave(name, interviewer);
  }

  const cancel = function() {
    // reset();
    props.onCancel();
  }
  
  console.log('ShowGoal props: ', props)

  return (
    <article className="goalForm">
      <form>
        <div className="goalWrapper">
          <textarea
            className="inputName"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              // e.target.style.height = 25 + "px"
              // e.target.style.height = e.target.scrollHeight + "px"
            }}
            placeholder="Goal Name"
          />
          <div className="content">
            <div>Type of Goal:</div>
            <div>
              <input
                name="type"
                type="radio"
                value="SFP"
                onClick={() => typeCheck("SFP")}
              />
            Save for Purchase</div>
            <div>
              <input
                name="type"
                type="radio"
                value="SPW"
                onClick={() => typeCheck("SPW")}
              />
            Save per Week</div>
            <div>
              <input
                name="type"
                type="radio"
                value="LE"
                onClick={() => typeCheck("LE")}
              />
            Limit Expenses</div>
            <div>Date: {props.date}</div>
            <div>
              <textarea
                className="inputDescription"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value)
                  // e.target.style.height = 100 + "px"
                  // e.target.style.height = e.target.scrollHeight + "px"
                }}
                placeholder="Description"
              />
            </div>
          </div>
          <div className="buttons">
            <CustomButton
              className="button"
              bsStyle="info"
              onClick={() => cancel()}
            >Cancel</CustomButton>
            <CustomButton
              className="button"
              bsStyle="success"
              onClick={() => validate()}
            >Save</CustomButton>
          </div>
        </div>
      </form>
    </article>
  );
}
