import React, { Component } from "react";
import Card from "components/Card/Card.jsx";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 80,
    },
  },
  tableHead: {
    fontSize: '12pt',
  },
  tableCell: {
    fontSize: '10pt',
  },
}));

export default function BudgetPlannerA(props) {

  const classes = useStyles();

  return (
    <Card
      title="Budget Planner"
      category="insert your monthly budget by categories here"
      ctTableFullWidth
      ctTableResponsive
      content={
        <div>
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHead}>Income</TableCell>
                  <TableCell className={classes.tableHead} align="right"></TableCell>
                  <TableCell className={classes.tableHead} align="right"></TableCell>
                  <TableCell className={classes.tableHead} align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  <TableRow key={1}>
                  <TableCell component="th" scope="row" className={classes.tableCell}>
                    {'Default'}
                  </TableCell>
                  <TableCell align="right">
                    {
                      <TextField
                      type="number"
                      inputProps={{ min: "0", max: "9999999999", step: "100", width: "100px" }}
                      style = {{width: 100}}
                      onInput={(e)=>{ 
                        e.target.value = parseInt(Math.max(0, parseInt(e.target.value)).toString().slice(0,10))
                      }}
                    />
                    }
                  </TableCell>
                  <TableCell component="th" scope="row" className={classes.tableCell}>
                    {'Income'}
                  </TableCell>
                  <TableCell align="right">
                    {
                      <TextField
                      type="number"
                    />
                    }
                    </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tableHead}>Expenses</TableCell>
                  <TableCell className={classes.tableHead} align="right"></TableCell>
                  <TableCell className={classes.tableHead} align="right"></TableCell>
                  <TableCell className={classes.tableHead} align="right"></TableCell>
                </TableRow>
                <TableRow key={2}>
                  <TableCell component="th" scope="row" className={classes.tableCell}>
                    {'Housing'}
                  </TableCell>
                  <TableCell align="right">
                    {
                      <TextField
                      type="number"
                    />
                    }
                  </TableCell>
                  <TableCell component="th" scope="row" className={classes.tableCell}>
                    {'Transportation'}
                  </TableCell>
                  <TableCell align="right">
                    {
                      <TextField
                      type="number"
                    />
                    }
                    </TableCell>
                </TableRow>
                  <TableRow key={3}>
                  <TableCell component="th" scope="row" className={classes.tableCell}>
                    {'Food'}
                  </TableCell>
                  <TableCell align="right">
                    {
                      <TextField
                      type="number"
                    />
                    }
                  </TableCell>
                  <TableCell component="th" scope="row" className={classes.tableCell}>
                    {'Util/Phone/Internet'}
                  </TableCell>
                  <TableCell align="right">
                    {
                      <TextField
                      type="number"
                    />
                    }
                    </TableCell>
                </TableRow>
                <TableRow key={4}>
                  <TableCell component="th" scope="row" className={classes.tableCell}>
                    {'Entertainment'}
                  </TableCell>
                  <TableCell align="right">
                    {
                      <TextField
                      type="number"
                    />
                    }
                  </TableCell>
                  <TableCell component="th" scope="row" className={classes.tableCell}>
                    {'Medical/Health'}
                  </TableCell>
                  <TableCell align="right">
                    {
                      <TextField
                      type="number"
                    />
                    }
                    </TableCell>
                </TableRow>
                  <TableRow key={5}>
                  <TableCell component="th" scope="row" className={classes.tableCell}>
                    {'Debt'}
                  </TableCell>
                  <TableCell align="right">
                    {
                      <TextField
                      type="number"
                    />
                    }
                  </TableCell>
                  <TableCell component="th" scope="row" className={classes.tableCell}>
                    {'Misc'}
                  </TableCell>
                  <TableCell align="right">
                    {
                      <TextField
                      type="number"
                    />
                    }
                    </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      }
    />
  );
}