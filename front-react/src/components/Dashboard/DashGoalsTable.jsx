import React from "react";
import Card from "components/Card/Card.jsx";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
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

export default function BudgetGoals(props) {
  const classes = useStyles();

  const GoalsInList = props.state.goals.map(goal => {
    return (
      <TableRow key={goal.id}>
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
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHead}>Title</TableCell>
              <TableCell className={classes.tableHead}>Type</TableCell>
              <TableCell className={classes.tableHead}>Amount</TableCell>
              <TableCell className={classes.tableHead}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{GoalsInList}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
