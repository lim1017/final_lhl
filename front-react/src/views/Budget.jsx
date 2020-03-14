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

/* Import Global State/Hooks */ 
import React, { useContext, useReducer } from "react";
import appDataContext from "../hooks/reducers/useContext";
import budgetReducer from "../hooks/reducers/budget";

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
import { budgetSetGraphData } from "helpers/budgetCalc";
import MonthPicker from "components/MonthPicker/MonthPicker.jsx";
import axios from "axios";

// Outer Functions


/* --------------- */
/* Budget Function */
/* --------------- */
function Budget(props) {

  // States & Variables
  const{ state, dispatch } = useContext(appDataContext);
  const [ budget, dispatchBudget ] = useReducer( budgetReducer, {
    id: 0,
    user_id: 0,
    default: 100000,
    income: 1000,
    c_hous: 10,
    c_tran: 20,
    c_food: 30,
    c_util: 40,
    c_entr: 50,
    c_medi: 60,
    c_debt: 70,
    c_misc: 80
  });

  // Inner Functions
  console.log('this is budget: ', budget);
  console.log(state)

  function chgMonth(date) {
    const dateA = {
      month: date.month,
      year: date.year
    };

    dispatch({
      type: "SET_DATE",
      date: dateA
    });

    refreshExpenses(date);
  }

  function refreshExpenses(date) {
    let datez = `${date.month}+${date.year}`;

    Promise.all([
      axios.get(`http://localhost:8001/api/expenses/${datez}`),
      axios.get(`http://localhost:8001/api/expensestotal/${datez}`)
    ])
      .then(response => {
        dispatch({
          type: "SET_DATA",
          expenses: response[0].data,
          totalExpenses: response[1].data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  function updateBudgetLocal(data) {
    dispatchBudget(data)
  }

  function getActualExpenses(n) {
    return (state.totalExpenses[n] ? state.totalExpenses[n].sum : 0)
  }

  // Render Contents
  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col>
            <BudgetPlannerA
              budget={budget}
              updateBudgetLocal={updateBudgetLocal}
            />
          </Col>
        </Row>
        <Row>
          <Card
            title="Plan vs Actual Total Expenses"
            category="compare planned expenses vs expenses in given month"
            ctTableFullWidth
            ctTableResponsive
            content={
              <div>
                <MonthPicker currentMonth={state.date} chgMonth={chgMonth} />
              </div>
            }
          />
        </Row>
        <Row>
          <Col lg={4}>
            <Card
              title="Plan vs Actual Total Expenses"
              category="compare planned expenses vs expenses in given month"
              ctTableFullWidth
              ctTableResponsive
              content={
                <div>
                  <ChartistGraph
                    data={{
                      labels: ['Plan', 'Month'],
                      series: [
                        [budget.c_hous, getActualExpenses(5)],
                        [budget.c_tran, getActualExpenses(4)],
                        [budget.c_food, getActualExpenses(6)],
                        [budget.c_util, getActualExpenses(7)],
                        [budget.c_entr, getActualExpenses(0)],
                        [budget.c_medi, getActualExpenses(1)],
                        [budget.c_debt, getActualExpenses(2)],
                        [budget.c_misc, getActualExpenses(3)],
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
          <Col lg={8}>
            <Card
              title="Plan vs Actual Expenses by Category"
              category="compare planned expenses vs expenses in given month"
              ctTableFullWidth
              ctTableResponsive
              content={
                <div>
                  <ChartistGraph
                    data={{
                      labels: ['Housing', 'Transportation', 'Food', 'Utility', 'Entertainment', 'Medical', 'Debt', 'Misc'],
                      series: [
                        [budget.c_hous, budget.c_tran, budget.c_food, budget.c_util, budget.c_entr, budget.c_medi, budget.c_debt, budget.c_misc],
                        [
                          getActualExpenses(5),
                          getActualExpenses(4),
                          getActualExpenses(6),
                          getActualExpenses(7),
                          getActualExpenses(0),
                          getActualExpenses(1),
                          getActualExpenses(2),
                          getActualExpenses(3)
                        ]
                      ]
                    }}
                    type="Bar"
                    options={{
                      seriesBarDistance: 10,
                      height: "240px",
                      stackBars: false
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
        </Row>
        <Row>
          <Col lg={12}>
            <Card
              title="Budget Plan summary"
              category="insert other budget informations here"
              ctTableFullWidth
              ctTableResponsive
              content={
                <div>
                  <ChartistGraph
                    data={
                      budgetSetGraphData(budget, null)
                    }
                    targetLine={{
                      value: 400,
                      class: 'ct-target-line'
                    }}
                    type="Line"
                    options={{
                      low: parseInt(budget.default || 0),
                      high: parseInt(budget.default || 0) + budget.income * 12,
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
                        left: 50,
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

                        // console.log('this is context: ', context)
                        // console.log('this is context.bound: ', context.bounds)
                        // console.log("chartRect: ", context.chartRect.height())
                        // console.log(context.chartRect.height())

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

                        // console.log(context.chartRect.x1, context.chartRect.x2, targetLineY, targetLineY)
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
