/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

/* ------------------------ */
/* Initialization / Imports */
/* ------------------------ */

/* Import Global State */ 
import React, { useContext, useState } from "react";
import appDataContext from "../hooks/reducers/useContext";

/* Import Components */
import Card from "components/Card/Card.jsx";
import { Grid, Row, Col } from "react-bootstrap";
import ChartistGraph from "react-chartist";
import {
  optionsBar,
  responsiveBar,
  optionsSales,
  responsiveSales
} from "variables/Variables.jsx";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import BudgetPlannerA from "components/BudgetPlanner/budgetplannerA";

// Outer Functions
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49,
  <TextField
    id="standard-number"
    label="Number"
    type="number"
    InputLabelProps={{
      shrink: true,
    }}
  />)
];

/* --------------- */
/* Budget Function */
/* --------------- */
function Budget(props) {

  // States & Variables
  const{ state, dispatch } = useContext(appDataContext);
  const [ localState, setLocalState ] = useState({
    localContent: 0
  });
  const classes = useStyles();

  // Inner Functions
  console.log('this is state in budget: ', state)

  // Render Contents
  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col>
            <BudgetPlannerA />
          </Col>
        </Row>
        <Row>
          <Col lg={5}>
            <Card
              title="Plan vs Actual Spending"
              category="compare planned expenses vs expenses in given month"
              ctTableFullWidth
              ctTableResponsive
              content={
                <div
                  id="chartPreferences"
                  className="ct-chart ct-perfect-fourth"
                >
                  <ChartistGraph
                    data={{
                      labels: ['Plan', 'Month'],
                      series: [
                        [800, 1200],
                        [200, 400],
                        [100, 200]
                      ]
                    }}
                    targetLine= {{
                      value: 400,
                      class: 'ct-target-line'
                    }}
                    type="Bar"
                    options={{
                      seriesBarDistance: 5,
                      height: "240px",
                      stackBars: true
                    }}
                    responsiveOptions={responsiveBar}
                    // listener={{
                    //   draw: e => onDrawHandler(e)
                    // }}
                  />
                </div>
              }
            />
          </Col>
          <Col lg={7}>
            <Card
              title="Budget Plan summary"
              category="insert other budget informations here"
              ctTableFullWidth
              ctTableResponsive
              content={
                <div
                  id="chartPreferences"
                  className="ct-chart ct-perfect-fourth"
                >
                  <ChartistGraph
                    data={{
                      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                      series: [
                        [12, 9, 7, 8, 5],
                        [2, 1, 3.5, 7, 3],
                        [1, 3, 4, 5, 6]
                      ]
                    }}
                    targetLine={{
                      value: 400,
                      class: 'ct-target-line'
                    }}
                    type="Line"
                    options={{
                      low: 0,
                      high: 12,
                      showArea: false,
                      height: "245px",
                      axisX: {
                        showGrid: false
                      },
                      lineSmooth: true,
                      showLine: true,
                      showPoint: true,
                      fullWidth: true,
                      chartPadding: {
                        right: 50
                      }
                    }}
                    responsiveOptions={responsiveSales}
                    listener={{
                      created: context => {

                        function projectY(chartRect, bounds, value) {
                          // height of chart top
                          return chartRect.y1 - 
                            // height of chart base to line
                            (chartRect.height() * (value - bounds.min) / (bounds.range/* + bounds.step*/));
                        }
                        function projectX(chartRect, axisX, value) {
                          // height of chart top
                          // return chartRect.x1 + (chartRect.width()/* / bounds.max * value*/);
                          return chartRect.x1 + (axisX.stepLength * value);
                        }
                        var targetLineY = projectY(context.chartRect, context.bounds, 10);
                        var targetLineX = projectX(context.chartRect, context.axisX, 3.5);

                        console.log('this is context: ', context)
                        console.log('this is context.bound: ', context.bounds)
                        console.log("chartRect: ", context.chartRect.height())
                        console.log(context.chartRect.height())

                        context.svg.elem('line', {
                          x1: context.chartRect.x1,
                          x2: context.chartRect.x2,
                          y1: targetLineY,
                          y2: targetLineY
                        }, 'ct-target-line');

                        context.svg.elem('line', {
                          x1: targetLineX,
                          x2: targetLineX,
                          y1: context.chartRect.y1,
                          y2: context.chartRect.y2
                        }, 'ct-target-line');

                        console.log(context.chartRect.x1, context.chartRect.x2, targetLineY, targetLineY)
                      }
                    }}
                  />
                </div>
              }
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );

}

export default Budget;
