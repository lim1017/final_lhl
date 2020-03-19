/* ------- */
/* Imports */
/* ------- */

/* Import Global State/Hooks */ 
import React, { useContext, useReducer, useState, useEffect } from "react";

import appDataContext from "../hooks/reducers/useContext";
import axios from "axios";
import reducerz from "../hooks/reducers/app";
import budgetReducer from "../hooks/reducers/budget";
import budgetToggleReducer from "../hooks/reducers/budgetToggle";
import budgetGoalsReducer from "../hooks/reducers/budgetGoals";

/* Import Components */
import Card from "components/Card/Card.jsx";
import BudgetGraphCard from "components/Budget/BudgetGraphCard.jsx";
import { Grid, Row, Col } from "react-bootstrap";
import ChartistGraph from "react-chartist";
import { globalStateDefault, responsiveSales } from "variables/Variables.jsx";
import BudgetPlanner from "components/Budget/BudgetPlanner";
import BudgetGoals from "components/Budget/BudgetGoals";
import BudgetInputMenu from "components/Budget/BudgetInputMenu";
import BudgetChartMenu from "components/Budget/BudgetChartMenu";
import { budgetCalc, budgetCalcPortfolio, budgetSetGraphData, findUserBudget, expensesCalc } from "helpers/budget";
import useWindowDimensions from "helpers/windowDimensions";

import MonthPicker from "components/MonthPicker/MonthPicker.jsx";
import { LineChart, Line, Legend, BarChart, Bar, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, } from 'recharts';

/* --------------- */
/* Budget Function */
/* --------------- */
function Budget(props) {

  /* ------------------ */
  /* States & Variables */
  /* ------------------ */

  // const{ state, dispatch } = useContext(appDataContext);
  const [state, dispatch] = useReducer(reducerz, globalStateDefault);
  const [ budget, dispatchBudget ] = useReducer(budgetReducer, findUserBudget(state, 1));
  const [ goal, dispatchGoal ] = useReducer(budgetGoalsReducer, {
    id: [],
    select: []
  });
  const [ toggle, dispatchToggle ] = useReducer(budgetToggleReducer, {
    planner: true,
    goal: false,
    pvat: true,
    pvac: true,
    botg: true

  });
  const [range, setRange] = useState(12);
  const [portfolio, setPortfolio] = useState(1);
  const { /*height: winHeight,*/ width: winWidth } = useWindowDimensions();
  const [error, setError] = useState("");

  const expenseKey = ['entertainment', 'medical', 'debt', 'misc', 'transporation', 'home', 'food', 'utilities'];
  const budgetKey = [budget.c_entr, budget.c_medi, budget.c_debt, budget.c_misc, budget.c_tran, budget.c_hous, budget.c_food, budget.c_util];

  /* ------------------------------------ */
  /* Init & useEffects & Database Updates */
  /* ------------------------------------ */

  if (state.users && state.users.length > 0) {
    for (const user of state.users) {
      if (user.id === 1 && user.portfolioreturn > 1 && user.portfolioreturn !== portfolio) {
        setPortfolio(user.portfolioreturn);
      }
    }
  }

  useEffect(() => {

    let datez= `${state.date.month}+${state.date.year}`

      Promise.all([
        axios.get(`http://localhost:8001/api/expenses/${datez}`),
        axios.get(`http://localhost:8001/api/expensestotal/${datez}`),
        axios.get("http://localhost:8001/api/budget"),
        axios.get("http://localhost:8001/api/goals"),
        axios.get("http://localhost:8001/api/users")

      ]).then(response => {
        dispatch({
          type: "SET_DATA",
          expenses: response[0].data,
          totalExpenses: response[1].data,
          budget: response[2].data,
          goals: response[3].data,
          users: response[4].data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    for (const bud of state.budget) {
      if (bud.user_id === 1 && bud !== budget) {
        dispatchBudget({
          type: "ALL",
          budget: findUserBudget(state, 1)
        });
      }
    }
  }, state.budget);

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
          ...state,
          type: "SET_DATA",
          expenses: response[0].data,
          totalExpenses: response[1].data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  function savePlanner() {

    const newBud = {
      ...budget
    };

    axios
      .put(`http://localhost:8001/api/budget`, newBud)
      .then(res1 => {
        axios.get("http://localhost:8001/api/budget")
        .then(res2 => {
          dispatch({
            ...state,
            type: "SET_DATA",
            budget: res2.data
          });
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  const validatePlanner = function() {
    if (isNaN(budget.base)) { setError("base required"); return;
    } else if (isNaN(budget.income)) { setError("income required"); return;
    } else if (isNaN(budget.c_hous)) { setError("housing expenses required"); return;
    } else if (isNaN(budget.c_tran)) { setError("transport expenses required"); return;
    } else if (isNaN(budget.c_food)) { setError("food expenses required"); return;
    } else if (isNaN(budget.c_util)) { setError("utility expenses required"); return;
    } else if (isNaN(budget.c_entr)) { setError("entertainment expenses required"); return;
    } else if (isNaN(budget.c_medi)) { setError("medical expenses required"); return;
    } else if (isNaN(budget.c_debt)) { setError("debt expenses required"); return;
    } else if (isNaN(budget.c_misc)) { setError("misc expenses required"); return;
    }

    setError("");
    savePlanner();
  }

  /* --------------- */
  /* Chart Data Prep */
  /* --------------- */

  // function getActualExpenses(n) {
  //   return state.totalExpenses[n] ? state.totalExpenses[n].sum : 0;
  // }

  function setGraphDisplayRange(bud, goal, range, port) {
    const res = {
      yMin : parseInt(bud.base) || 0,
      yMax : (parseInt(bud.base) || 0) + budgetCalc(bud) * range
    }

    if (budgetCalc(bud) * range < 0) {
      res.yMin = (parseInt(bud.base) || 0) + budgetCalc(bud) * range;
      res.yMax = parseInt(bud.base) || 0;
    }

    for (const g of goal.select) {
      if (g.type === "SFP") {
        if (g.amount > res.yMax) res.yMax = g.amount;
        if (g.amount < res.yMin) res.yMin = g.amount;
      }
    }

    if (port > 1) {
      let portGain = budgetCalcPortfolio(budget.base, budget.income, port, range);
      if (portGain > res.yMax) res.yMax = portGain;
    }

    res.yMax *= 1.1;
    if (res.yMax < 10000) res.yMax = 10000;

    return res;
  }

  const formatDataForPVAT = function(budgetKey, expensesTotal) {
    const result = [];
    const plan = {name: 'plan'};
    const actual = {name: 'actual'};

    for (let i = 0; i < expenseKey.length; i++) {
      plan[`${expenseKey[i]}`] = budgetKey[i];
      for (const expense of expensesTotal) {
        if (expense.type === expenseKey[i]) {
          actual[`${expenseKey[i]}`] = expense.sum;
        }
      }
    }

    result.push(plan);
    result.push(actual);

    return result;
  };

  const formatDataForPVAC = function(budgetKey, expensesTotal) {
    const result = [];

    for (let i = 0; i < expenseKey.length; i++) {
      let actualData = 0;
      for (const expense of expensesTotal) {
        if (expense.type === expenseKey[i]) {
          actualData = expense.sum;
        }
      }
      result.push({name: expenseKey[i], Plan: budgetKey[i], Actual: actualData})
    }

    return result;
  };

  const setDisplayForPVAT = function(budgetKey, expensesTotal, goal) {
    let height, plan, actual = 0;

    for (const budget of budgetKey) {
      plan += parseInt(budget)
    }

    for (const expense of expensesTotal) {
      actual += parseInt(expense.sum);
    }

    if (plan > actual) height = plan;
    else height = actual;

    return Math.floor(height * 1.1);
  } 

  const setDisplayForPVAC = function(budgetKey, expensesTotal, goal) {
    let height = 0;

    for (const budget of budgetKey) {
      if (parseInt(budget) > height) height = budget;
    }

    for (const expense of expensesTotal) {
      if (parseInt(expense.sum) > height) height = expense.sum;
    }

    return Math.floor(height * 1.1)
  } 

  const ReferenceLines = function() {
    return(
      <ReferenceLine y={9800} label="Max" stroke="red" />
    )
  }

  function setBarGraphDisplayRange(bud, expenses) {
    const res = {
      yMin : 0,
      yMax : 0
    }

    const budgetMax = bud.c_hous + bud.c_tran + bud.c_food + bud.c_util + bud.c_entr + bud.c_medi + bud.c_debt + bud.c_misc;
    const expensesMax = expensesCalc(expenses);
    if (expensesMax > budgetMax) res.yMax = expensesMax;
    else res.yMax = budgetMax;

    for (const g of goal.select) {
      if (g.type === "LE") {
        if (g.amount > res.yMax) res.yMax = g.amount;
      }
    }

    res.yMax *= 1.1;
    if (res.yMax < 2000) res.yMax = 2000;

    return res;
  }

  /* --------------- */
  /* Render Contents */
  /* --------------- */

  return (
    <div className="budgetWrap">
    <div style={{ display: "flex", width: "100%" }}>
      <div className="budgetNav">
        <div className="budgetNavA">
          <MonthPicker currentMonth={state.date} chgMonth={chgMonth} />
        </div>
        <div className="budgetNavB budgetButtons">
          <BudgetInputMenu
            toggle={toggle}
            dispatch={dispatchToggle}
          />
          <BudgetChartMenu
            toggle={toggle}
            dispatch={dispatchToggle}
          />
        </div>
      </div>
    </div>
    <div className="top100px content">
      <Grid fluid>
        <Row>
          <Col lg={12}>
            {toggle.planner ?
            <BudgetPlanner
              budget={budget}
              updateBudgetLocal={dispatchBudget}
              validate={validatePlanner}
              error={error}
            />
            : null}
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            {toggle.goal ?
            <BudgetGoals
              goal={goal}
              selectGoal={dispatchGoal}
              goals={state.goals}
              budget={budget}
              updateBudgetLocal={dispatchBudget}
            />
            : null}
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            {toggle.pvat ?
            <Card
              title="Plan vs Actual Total Expenses"
              category="compare planned expenses vs expenses in given month"
              ctTableFullWidth
              ctTableResponsive
              content={
                <BarChart width={730} height={350} data={formatDataForPVAT(budgetKey, state.totalExpenses)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, setDisplayForPVAT(budgetKey, state.totalExpenses, goal)]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey={expenseKey[0]} stackId="a" fill="#ffe7ea" />
                  <Bar dataKey={expenseKey[1]} stackId="a" fill="#c4d2c7" />
                  <Bar dataKey={expenseKey[2]} stackId="a" fill="#ffe7ea" />
                  <Bar dataKey={expenseKey[3]} stackId="a" fill="#c4d2c7" />
                  <Bar dataKey={expenseKey[4]} stackId="a" fill="#ffe7ea" />
                  <Bar dataKey={expenseKey[5]} stackId="a" fill="#c4d2c7" />
                  <Bar dataKey={expenseKey[6]} stackId="a" fill="#ffe7ea" />
                  <Bar dataKey={expenseKey[7]} stackId="a" fill="#c4d2c7" />
                </BarChart>
              }
            />
          : null}
          </Col>
          <Col lg={12}>
            {toggle.pvac ?
            <Card
              title="Plan vs Actual Expenses by Category"
              category="compare planned expenses vs expenses in given month"
              ctTableFullWidth
              ctTableResponsive
              content={
                <BarChart width={730} height={350} data={formatDataForPVAC(budgetKey, state.totalExpenses)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, setDisplayForPVAC(budgetKey, state.totalExpenses, goal)]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Plan" fill="#ffe7ea" />
                  <Bar dataKey="Actual" fill="#c4d2c7" />
                </BarChart>
              }
            />
          : null}
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            {toggle.botg ?
            <BudgetGraphCard
              title="Budget Plan summary"
              category="insert other budget informations here"
              ctTableFullWidth
              ctTableResponsive
              range={range}
              setRange={setRange}
              content={
                <LineChart width={730} height={350} data={budgetSetGraphData(budget, range, portfolio)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <ReferenceLine x="Page C" stroke="red" label="Max PV PAGE" />
                  {ReferenceLines}
                  <Line type="monotone" dataKey="budget" stroke="#8884d8" />
                  <Line type="monotone" dataKey="portfolio" stroke="#82ca9d" />
                </LineChart>
                // <div>
                //   <ChartistGraph
                //     data={
                //       budgetSetGraphData(budget, range, portfolio)
                //     }
                //     // targetLine={{
                //     //   value: 400,
                //     //   class: 'ct-target-line'
                //     // }}
                //     type="Line"
                //     options={{
                //       low: setGraphDisplayRange(budget, goal, range, portfolio).yMin || 0,
                //       high: setGraphDisplayRange(budget, goal, range, portfolio).yMax || 0,
                //       showArea: false,
                //       height: "245px",
                //       axisX: {
                //         showGrid: true
                //       },
                //       lineSmooth: true,
                //       showLine: true,
                //       showPoint: true,
                //       fullWidth: true,
                //       chartPadding: {
                //         left: 50,
                //         right: 50
                //       }
                //     }}
                //     responsiveOptions={responsiveSales}
                //     listener={{
                //       draw: data => {
                //         if(data.type === 'label') {
                //           if (data.text < 10) {
                //             data.element.attr({
                //               x: data.x - (winWidth / 300)
                //             });
                //           } else if (data.text < 100) {
                //             data.element.attr({
                //               x: data.x - (winWidth / 150)
                //             });
                //           } else {
                //             data.element.attr({
                //               x: data.x - (winWidth / 80)
                //             });
                //           }
                //         }
                //         if(data.type === 'line' || data.type === 'area') {
                //           data.element.animate({
                //             d: {
                //               begin: 1 * data.index,
                //               dur: 500,
                //               from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                //               to: data.path.clone().stringify()
                //               // easing: Chartist.Svg.Easing.easeOutQuint
                //             }
                //           });
                //         }
                //       },
                //       created: context => {

                //         for (const g of goal.select) {
                //           const currentDate = new Date();
                //           const goalYear = g.date.split('-')[2];
                //           const goalMonthText = g.date.split('-')[1];
                //           let goalMonth = 0;
                //           let totalMonth = 0;
                          
                //           if (goalMonthText) {
                //             if (goalMonthText === "JAN") goalMonth = 1;
                //             if (goalMonthText === "FEB") goalMonth = 2;
                //             if (goalMonthText === "MAR") goalMonth = 3;
                //             if (goalMonthText === "APR") goalMonth = 4;
                //             if (goalMonthText === "MAY") goalMonth = 5;
                //             if (goalMonthText === "JUN") goalMonth = 6;
                //             if (goalMonthText === "JUL") goalMonth = 7;
                //             if (goalMonthText === "AUG") goalMonth = 8;
                //             if (goalMonthText === "SEP") goalMonth = 9;
                //             if (goalMonthText === "OCT") goalMonth = 10;
                //             if (goalMonthText === "NOV") goalMonth = 11;
                //             if (goalMonthText === "DEC") goalMonth = 12;
                //           }
                          
                //           totalMonth = (goalYear - currentDate.getFullYear()) * 12 + goalMonth - (currentDate.getMonth() + 1)
                //           if (context.axisX.ticks.length > 12) totalMonth = totalMonth / 3;

                //           if (g.type === "SFP") {

                //             function projectY(chartRect, bounds, value) {
                //               return chartRect.y1 - 
                //                 (chartRect.height() * (value - bounds.min) / (bounds.range/* + bounds.step*/));
                //             }
                //             function projectX(chartRect, axisX, value) {
                //               return chartRect.x1 + (axisX.stepLength * value);
                //             }

                //             let targetLineY1 = projectY(context.chartRect, context.bounds, g.amount);
                //             let targetLineY2 = projectY(context.chartRect, context.bounds, g.amount);
                //             let targetLineX = projectX(context.chartRect, context.axisX, totalMonth);

                //             context.svg.elem('line', {
                //               x1: context.chartRect.x1,
                //               x2: context.chartRect.x2,
                //               y1: targetLineY1,
                //               y2: targetLineY2
                //             }, 'ct-target-line');
                            
                //             if (totalMonth > 0 && totalMonth <= context.axisX.ticks.length) {
                //               context.svg.elem('line', {
                //                 x1: targetLineX,
                //                 x2: targetLineX,
                //                 y1: context.chartRect.y1,
                //                 y2: context.chartRect.y2
                //               }, 'ct-target-line');
                //             }

                //           }
                //         }

                //       }
                //     }}
                //     // listener={{"draw" : function(data) {
                //     //   if(data.type === 'line' || data.type === 'area') {
                //     //     data.element.animate({
                //     //       d: {
                //     //         begin: 1 * data.index,
                //     //         dur: 500,
                //     //         from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                //     //         to: data.path.clone().stringify()
                //     //         // easing: Chartist.Svg.Easing.easeOutQuint
                //     //       }
                //     //     });
                //     //   }
                //     // }}}
                //   />
                // </div>
              }
            />
          : null}
          </Col>
        </Row>
      </Grid>
    </div>
    </div>
  );
}

export default Budget;
