import React from "react";
import CardBudget from "components/Card/CardBudget.jsx";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 80
    }
  },
  tableHead: {
    fontSize: "12pt"
  },
  tableCell: {
    fontSize: "10pt"
  }
}));

const monthName = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC"
];

export default function BudgetGoals(props) {
  const classes = useStyles();
  const changeRange = function(goal) {
    let range = 0;
    let sm = new Date().getMonth() + 1;
    let em = 0;
    for (let i = 0; i < monthName.length; i++) {
      if (goal.date.split("-")[1] === monthName[i]) em = i + 1;
    }
    range =
      (parseInt(goal.date.split("-")[2]) - new Date().getFullYear()) * 12 +
      em -
      sm;

    if (range < 12) {
      props.setRange(12);
    }
    if (range < 60 && range >= 12) {
      props.setRange(60);
    }
    if (range < 120 && range >= 60) {
      props.setRange(120);
    }
    if (range < 180 && range >= 120) {
      props.setRange(180);
    }
    if (range < 240 && range >= 240) {
      props.setRange(240);
    }
    if (range >= 240) {
      props.setRange(600);
    }
  };

  const GoalsInList = props.goals.map(goal => {
    return (
      <TableRow key={goal.id}>
        <TableCell component="th" scope="row" className={classes.tableCell}>
          <Checkbox
            checked={props.goal.id.includes(goal.id)}
            onChange={() => {
              props.selectGoal({ type: "SELECT", id: goal.id, goal });
              changeRange(goal);
            }}
          />
        </TableCell>
        <TableCell component="th" scope="row" className={classes.tableCell}>
          {goal.name}
        </TableCell>
        <TableCell component="th" scope="row" className={classes.tableCell}>
          {goal.type}
        </TableCell>
        <TableCell component="th" scope="row" className={classes.tableCell}>
          ${goal.amount}
        </TableCell>
        <TableCell component="th" scope="row" className={classes.tableCell}>
          {`${goal.date.split("-")[1]}-${goal.date.split("-")[2]}`}
        </TableCell>
      </TableRow>
    );
  });

  return (
    <CardBudget
      title="Your Goals"
      size={props.size}
      dispatch={props.dispatch}
      dispatchType="GOAL"
      dispatchInfo={props.dispatchInfo}
      content={
        <div>
          {props.info.goal ? (
            <div>
              <p>
                This card pulls the goals you saved in the Goals tab. Checking
                the box for a specific goal will allow you to see if you can hit
                that goal in the given timeframe.{" "}
              </p>
              <p>
                SFP: "Saving for Purchase" will be displayed on the Power of
                Investing graph.
              </p>
              <p>
                SPM: "Saving per Month" will be displayed on the Budgeted vs
                Actual Monthly Saving graph.
              </p>
              <p>
                LE: "Limit Expenses" will be displayed on Budgeted vs Actual
                Expenses graph.
              </p>
              <p>Press ? to go back.</p>
            </div>
          ) : (
            <TableContainer component={Paper}>
              <Table
                className={classes.table}
                size="small"
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableHead}></TableCell>
                    <TableCell className={classes.tableHead}>Title</TableCell>
                    <TableCell className={classes.tableHead}>Type</TableCell>
                    <TableCell className={classes.tableHead}>Amount</TableCell>
                    <TableCell className={classes.tableHead}>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{GoalsInList}</TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      }
    />
  );
}
