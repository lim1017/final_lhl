import React, { useState } from "react";
import CustomButton from "../CustomButton/CustomButton";

export default function Form(props) {
  const [name, setName] = useState(props.name || "")
  const [type, setType] = useState(props.type || "")
  const [amount, setAmount] = useState(props.amount || "")
  const [description, setDescription] = useState(props.description || "")
  const [error, setError] = useState("");

  const typeCheck = function(value) {
    if (value !== type) {
      setType(value)
    }
  }

  const validate = function() {
    if (name === "") {
      setError("Goal name cannot be blank");
      return;
    } else if (type === "") {
      setError("Type of goal must be selected");
      return;
    } else if (amount === "" || isNaN(amount)) {
      setError("Amount cannot be blank or not a number");
      return;
    }

    setError("");
    props.onSave(name, type, amount, description, props.date);
  }

  const cancel = function() {
    // reset();
    props.onCancel();
  }

  // function onlyNumberKey(evt) { 
          
  //   // Only ASCII charactar in that range allowed 
  //   var ASCIICode = (evt.which) ? evt.which : evt.keyCode 
  //   if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) 
  //       return false; 
  //   return true; 
  // } 

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
            <div>Amount: $
            <textarea
              className="inputAmount"
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value)
                // e.target.style.height = 25 + "px"
                // e.target.style.height = e.target.scrollHeight + "px"
              }}
              // onkeypress="return isNumberKey(event)"
            />
            </div>
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
            {error}
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
