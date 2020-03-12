import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
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
    const expenseObj = { amount, name, type };
    console.log("hello");
    Promise.all([
      axios.put(`http://localhost:8001/api/expenses/add`, expenseObj)
    ])
      .then(response => {
        console.log("axios data recieved: ", response);
        props.onExpenseSubmit();
      })
      .catch(error => {
        console.log("no go");
      });
  }

  const formStyle = {
    marginTop: "25px",
    marginLeft: "25px"
  };

  return (
    <div display="flex" flexDirection="row">
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField
            id="standard-helperText"
            label="Name"
            defaultValue=""
            onChange={handleChangeName}
          />

          <TextField
            id="standard-helperText"
            label="Amount"
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
              <MenuItem value="food">Food</MenuItem>
              <MenuItem value="transportation">Transportation</MenuItem>
              <MenuItem value="home">Home</MenuItem>
              <MenuItem value="utilities">Utilities</MenuItem>
              <MenuItem value="entertainment">Entertainment</MenuItem>
              <MenuItem value="medical">Medical</MenuItem>
              <MenuItem value="debt">Debt Repayment</MenuItem>
              <MenuItem value="misc">Misc</MenuItem>
            </Select>
          </FormControl>

          <span>
            <Button
              style={formStyle}
              variant="contained"
              color="primary"
              onClick={() => submitExpense()}
            >
              Primary
            </Button>
          </span>
        </div>
      </form>
    </div>
  );
}

export default ExpenseUpdater1;
