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
import CardBudget from "components/Card/CardBudget.jsx";
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
import { AreaChart, Area, Legend, BarChart, Bar, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/* --------------- */
/* Budget Function */
/* --------------- */
function Budget(props) {

  /* ------------------ */
  /* States & Variables */
  /* ------------------ */

  const{ state, dispatch } = useContext(appDataContext);
  // const [state, dispatch] = useReducer(reducerz, globalStateDefault);
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
    console.log('reloading budget page')
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

  const formatDataForPVAT = function(budgetKey, totalExpenses) {
    const result = [];
    const plan = {name: 'plan'};
    const actual = {name: 'actual'};

    console.log('pvat', budgetKey, totalExpenses)

    for (let i = 0; i < expenseKey.length; i++) {
      plan[`${expenseKey[i]}`] = budgetKey[i];
      for (const expense of totalExpenses) {
        if (expense.type === expenseKey[i]) {
          actual[`${expenseKey[i]}`] = expense.sum;
        }
      }
    }

    result.push(plan);
    result.push(actual);

    return result;
  };

  const formatDataForPVAC = function(budgetKey, totalExpenses) {
    const result = [];

    for (let i = 0; i < expenseKey.length; i++) {
      let actualData = 0;
      for (const expense of totalExpenses) {
        if (expense.type === expenseKey[i]) {
          actualData = expense.sum;
        }
      }
      result.push({name: expenseKey[i], Plan: budgetKey[i], Actual: actualData})
    }

    return result;
  };

  const formatDataForPVAS = function(budgetKey, totalExpenses) {
    const result = [{name: 'Plan', Plan: budget.income, Actual: budget.income}];

    for (let i = 0; i < budgetKey.length; i++) {
      result[0].Plan -= parseInt(budgetKey[i]);
    }

    for (let i = 0; i < totalExpenses.length; i++) {
      result[0].Actual -= parseInt(totalExpenses[i].sum);
    }

    return result;
  };

  const setDisplayForPVAT = function(budgetKey, totalExpenses, goal) {
    let height, plan, actual = 0;

    for (const budget of budgetKey) {
      plan += parseInt(budget)
    }

    for (const expense of totalExpenses) {
      actual += parseInt(expense.sum);
    }

    if (plan > actual) height = plan;
    else height = actual;

    return Math.floor(height * 1.1);
  } 

  const setDisplayForPVAC = function(budgetKey, totalExpenses, goal) {
    let height = 0;

    for (const budget of budgetKey) {
      if (parseInt(budget) > height) height = budget;
    }

    for (const expense of totalExpenses) {
      if (parseInt(expense.sum) > height) height = expense.sum;
    }

    return Math.floor(height * 1.1)
  }

  const setDisplayForBOTG = function(bud, goal) {
    const res = {
      yMin: parseInt(bud.base),
      yMax: parseInt(bud.base) * 2
    }

    for (const g of goal) {
      if (g.type === "SFP") {
        if (parseInt(g.amount) > res.yMax) res.yMax = g.amount;
        if (parseInt(g.amount) < res.yMin) res.yMin = g.amount;
      }
    }

    res.yMax = Math.floor(res.yMax * 1.1);

    return res;
  }

  const referenceLines = goal.select.map(g => {
    if (g.type === "SFP") {
      return (
        <ReferenceLine key={g.id} y={g.amount} stroke="red" />
      );
    }
  });

  /* ---------------------- */
  /* Cards Size Adjustments */
  /* ---------------------- */

  const cardSize = function(width) {
    let size = {card: 600, graphX: 450, graphY: 200}
    if (width < 500) {
      size.card = 350;
      size.graphX = 300;
      size.graphY = 200;
    } else if (width >= 500 && width < 700) {
      size.card = 500;
      size.graphX = 440;
      size.graphY = 260;
    } else if (width >= 700 && width < 890) {
      size.card = 600;
      size.graphX = 540;
      size.graphY = 300;
    } else if (width >= 890 && width < 992) {
      size.card = 800;
      size.graphX = 720;
      size.graphY = 480;
    } else if (width >= 992) {
      size.card = 600;
      size.graphX = 540;
      size.graphY = 300;
    }

    // console.log('this is width/size', width, size);
    return size;
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
      <div className="budgetContents">
        <div className="budgetContent budgetContentA">
          {toggle.planner ?
          <BudgetPlanner
            budget={budget}
            updateBudgetLocal={dispatchBudget}
            validate={validatePlanner}
            error={error}
          />
          : null}
        </div>
        <div className="budgetContent budgetContentB">
          {toggle.goal ?
          <BudgetGoals
            goal={goal}
            selectGoal={dispatchGoal}
            goals={state.goals}
            budget={budget}
            updateBudgetLocal={dispatchBudget}
          />
          : null}
        </div>
        <div className="budgetContent budgetContentC">
          {toggle.pvat ?
          <CardBudget
            title="Plan vs Actual Total Expenses"
            category="compare planned expenses vs expenses in given month"
            size={cardSize(winWidth).card}
            content={
              <ResponsiveContainer minWidth='100%' minHeight={cardSize(winWidth).graphY} maxHeight={cardSize(winWidth).graphY}>
                <BarChart 
                  height={cardSize(winWidth).graphY}
                  data={formatDataForPVAT(budgetKey, state.totalExpenses)}
                  margin={{ top: 15, right: 40, left: 0, bottom: 0 }}
                >
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
              </ResponsiveContainer>
              }
            />
          : null}
        </div>
        <div className="budgetContent budgetContentD">
          {toggle.pvac ?
          <CardBudget
            title="Plan vs Actual Expenses by Category"
            category="compare planned expenses vs expenses in given month"
            size={cardSize(winWidth).card}
            content={
              <ResponsiveContainer minWidth='100%' minHeight={cardSize(winWidth).graphY} maxHeight={cardSize(winWidth).graphY}>
                <BarChart 
                  height={cardSize(winWidth).graphY}
                  data={formatDataForPVAC(budgetKey, state.totalExpenses)}
                  margin={{ top: 15, right: 40, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, setDisplayForPVAC(budgetKey, state.totalExpenses, goal)]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Plan" fill="#ffe7ea" />
                  <Bar dataKey="Actual" fill="#c4d2c7" />
                </BarChart>
              </ResponsiveContainer>
            }
          />
          : null}
          </div>
          <div className="budgetContent budgetContentE">
            {toggle.pvat ?
            <CardBudget
              title="Plan vs Actual Monthly Saving"
              category="compare planned expenses vs expenses in given month"
              size={cardSize(winWidth).card}
              content={
                <ResponsiveContainer minWidth='100%' minHeight={cardSize(winWidth).graphY} maxHeight={cardSize(winWidth).graphY}>
                  <BarChart 
                    height={cardSize(winWidth).graphY}
                    data={formatDataForPVAS(budgetKey, state.totalExpenses)}
                    margin={{ top: 15, right: 40, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Plan" fill="#ffe7ea" />
                    <Bar dataKey="Actual" fill="#c4d2c7" />
                  </BarChart>
                </ResponsiveContainer>
              }
            />
          : null}
        </div>
        <div className="budgetContent budgetContentF">
          {toggle.botg ?
          <BudgetGraphCard
            title="Budget Plan summary"
            category="insert other budget informations here"
            range={range}
            setRange={setRange}
            content={
              <AreaChart width={800} height={350} data={budgetSetGraphData(budget, range, portfolio)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tickCount={2}
                  interval="preserveStartEnd"
                />
                <YAxis
                  tickFormatter={(t)=>{  
                    if (t >= 1000000) return `$${Math.round(t/100000)/10}M`
                    if (t >= 1000) return `$${Math.round(t/100)/10}K`
                    return t;
                  }}
                  domain={[setDisplayForBOTG(budget, goal.select).yMin, setDisplayForBOTG(budget, goal.select).yMax]}
                />
                <Tooltip />
                <Legend />
                {referenceLines}
                <Area type="monotone" dataKey="saving" stackId="1" stroke="#c4d2c7" fill="#c4d2c7" />
                <Area type="monotone" dataKey="portfolio" stackId="1" stroke="#ffe7ea" fill="#ffe7ea" />
              </AreaChart>
            }
          />
          : null}
        </div>
      </div>
    </div>
  );
}

export default Budget;
