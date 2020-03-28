import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MUButton from "@material-ui/core/Button";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

function ExpenseUpdater1(props) {
  const classes = useStyles();

  const [amount, setAmount] = React.useState("");
  const [name, setName] = React.useState("");
  const [type, setType] = React.useState(null);
  const [button1, setButton1] = useState({
    color: "linear-gradient(45deg, #ec407a 30%, #f48fb1 90%)",
    x: 0
  });

  const style = {
    background: "linear-gradient(45deg, #ec407a 30%, #f48fb1 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 40,
    width: 105,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px #4a148c 30%",
    marginLeft: 0
  };

  const handleChangeName = event => {
    setName(event.target.value);
  };

  const handleChangeAmt = event => {
    setAmount(event.target.value);
  };

  const handleChangeType = event => {
    setType(event.target.value);
  };

  function submitExpense() {
    const userId = localStorage.getItem("id");

    const expenseObj = { amount, name, type, userId, date: props.date };

    var scoreUp = false;

    if (props.state.expenses.length === 0) {
      scoreUp = true;
    }

    Promise.all([
      axios.put(`http://localhost:8001/api/expenses/add`, {
        expenseObj,
        scoreUp
      })
    ])
      .then(response => {
        axios.get(`http://localhost:8001/api/users/${userId}`).then(resz => {
          props.doDispatch(props.state.date, resz.data);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div className="inside-1expense-div">
      <form
        id="add-expense-id"
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="standard-helperText"
            label="Name"
            type="text"
            defaultValue=""
            onChange={handleChangeName}
          />

          <TextField
            id="standard-helperText"
            type="number"
            label="Amount $"
            defaultValue=""
            onChange={handleChangeAmt}
          />

          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">
              Type of Expense
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              onChange={handleChangeType}
            >
              <MenuItem value="Food">Food</MenuItem>
              <MenuItem value="Transportation">Transportation</MenuItem>
              <MenuItem value="Home">Home</MenuItem>
              <MenuItem value="Utilities">Utilities</MenuItem>
              <MenuItem value="Entertainment">Entertainment</MenuItem>
              <MenuItem value="Medical">Medical</MenuItem>
              <MenuItem value="Debt">Debt Repayment</MenuItem>
              <MenuItem value="Misc">Misc</MenuItem>
            </Select>
          </FormControl>

          <span>
            <MUButton
              style={{
                ...style,
                background: button1.color,
                width: 105 - button1.x,
                marginLeft: "2em",
                marginTop: "10px"
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
              onClick={() => submitExpense()}
            >
              Submit Expense
            </MUButton>
          </span>
        </div>
      </form>
    </div>
  );
}

export default ExpenseUpdater1;
