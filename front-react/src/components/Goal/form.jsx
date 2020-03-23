import React, { useState } from "react";
import CustomButton from "../CustomButton/CustomButton";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { getMonthNum } from "../../helpers/goal";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [type, setType] = useState(props.type || "");
  const [amount, setAmount] = useState(props.amount || "");
  const [description, setDescription] = useState(props.description || "");
  const [month, setMonth] = useState(props.date.split("-")[1] || new Date().getMonth() + 1);
  const [year, setYear] = useState(props.date.split("-")[2] || new Date().getFullYear() + 1);
  const [error, setError] = useState("");

  const typeCheck = function(value) {
    if (value !== type) {
      setType(value);
    }
  };

  const validate = function() {
    const date = new Date(`${month}/1/${year}`);

    if (name === "") {
      setError("Goal name cannot be blank");
      return;
    } else if (type === "") {
      setError("Type of goal must be selected");
      return;
    } else if (amount === "" || isNaN(amount)) {
      setError("Amount cannot be blank or not a number");
      return;
    } else if (date === "" || isNaN(date.getTime())) {
      setError("Valid target date must be selected");
      return;
    }

    setError("");
    props.onSave(name, type, amount, description, date);
  };

  const cancel = function() {
    // reset();
    props.onCancel();
  };

  function chgMonth(chgDate) {
    let newMonth = month;
    let newYear = year;


    if (chgDate.month) {
      if (chgDate.month < 1) newMonth = 1;
      else if (chgDate.month > 12) newMonth = 12;
      else newMonth = chgDate.month;
      setMonth(newMonth);
    }
    if (chgDate.year) {
      if (chgDate.year < 2020) newYear = 2020;
      else if (chgDate.year > 2120) newYear = 2120;
      else newYear = chgDate.year;
      setYear(newYear);
    }
  }

  // function onlyNumberKey(evt) {

  //   // Only ASCII charactar in that range allowed
  //   var ASCIICode = (evt.which) ? evt.which : evt.keyCode
  //   if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
  //       return false;
  //   return true;
  // }

  console.log("goal edit props date: ", props.date, month, year);
  console.log("current date: ", new Date(`${month}/1/${year}`));

  return (
    <>
      <Grid item xs={12}>
        <article className="goalForm">
          <form>
            <div className="goalWrapper">
              <textarea
                className="inputName"
                value={name}
                onChange={e => {
                  e.target.value = e.target.value.slice(0,30);
                  setName(e.target.value);
                  // e.target.style.height = 25 + "px"
                  // e.target.style.height = e.target.scrollHeight + "px"
                }}
                placeholder="Name Your Goal"
              />

              <div className="content">
                <div className="flex">
                  <div className="width200">
                    Type of Goal:
                    <div>
                      <input
                        name="type"
                        type="radio"
                        checked={type === "SFP"}
                        onChange={() => typeCheck("SFP")}
                      />
                      Purchase
                    </div>
                    <div>
                      <input
                        name="type"
                        type="radio"
                        checked={type === "SPM"}
                        onChange={() => typeCheck("SPM")}
                      />
                      Save Money
                    </div>
                    <div>
                      <input
                        name="type"
                        type="radio"
                        checked={type === "LE"}
                        onChange={() => typeCheck("LE")}
                      />
                      Limit Expenses
                    </div>
                  </div>
                  <div className="width200">
                    <div>
                      $:
                      <TextField
                        type="number"
                        inputProps={{
                          min: "0",
                          max: "1000000000",
                          step: "100",
                          width: "100px"
                        }}
                        style={{ width: 80 }}
                        defaultValue={amount}
                        onInput={e => {
                          e.target.value = parseInt(
                            Math.max(0, parseInt(e.target.value))
                              .toString()
                              .slice(0, 10)
                          );
                          setAmount(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div>
                      <div>Month:</div>
                      <TextField
                        type="number"
                        inputProps={{
                          min: "1",
                          max: "12",
                          step: "1",
                          width: "100px"
                        }}
                        style={{ width: 50 }}
                        defaultValue={getMonthNum(month)}
                        onInput={e => {
                          e.target.value = parseInt(
                            Math.max(0, parseInt(e.target.value))
                              .toString()
                              .slice(0, 2)
                          );
                          chgMonth({ month: e.target.value });
                        }}
                      />
                    </div>
                    <div>
                      <div>Year:</div>
                      <TextField
                        type="number"
                        inputProps={{
                          min: "2020",
                          max: "2120",
                          step: "1",
                          width: "100px"
                        }}
                        style={{ width: 50 }}
                        defaultValue={year}
                        onInput={e => {
                          e.target.value = parseInt(
                            Math.max(0, parseInt(e.target.value))
                              .toString()
                              .slice(0, 4)
                          );
                          chgMonth({ year: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <textarea
                    className="inputDescription"
                    value={description}
                    onChange={e => {
                      setDescription(e.target.value);
                      // e.target.style.height = 100 + "px"
                      // e.target.style.height = e.target.scrollHeight + "px"
                    }}
                    placeholder="Description"
                  />
                </div>
              </div>
              <div className="errorMessage">
                {error}
              </div>
              <div className="buttons">
                <CustomButton
                  className="button"
                  style={{ color: "#9cb389", borderColor: "#9cb389" }}
                  onClick={() => cancel()}
                >
                  Cancel
                </CustomButton>
                <CustomButton
                  className="button"
                  style={{ color: "#9cb389", borderColor: "#9cb389" }}
                  onClick={() => validate()}
                >
                  Save
                </CustomButton>
              </div>
            </div>
          </form>
        </article>
      </Grid>
    </>
  );
}
