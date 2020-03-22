/* ------- */
/* Imports */
/* ------- */

/* Import Global State/Hooks */ 
import React, { useContext, useReducer, useState, useEffect } from "react";

import appDataContext from "../hooks/reducers/useContext";
import axios from "axios";
import budgetReducer from "../hooks/reducers/budget";
import budgetToggleReducer from "../hooks/reducers/budgetToggle";
import budgetGoalsReducer from "../hooks/reducers/budgetGoals";

/* Import Components */
import CardBudget from "components/Card/CardBudget.jsx";
import BudgetGraphCard from "components/Budget/BudgetGraphCard.jsx";
import BudgetPlannerA from "components/Budget/BudgetPlannerA";
import BudgetPlannerB from "components/Budget/BudgetPlannerB";
import BudgetGoals from "components/Budget/BudgetGoals";
import BudgetInputMenu from "components/Budget/BudgetInputMenu";
import BudgetChartMenu from "components/Budget/BudgetChartMenu";
import { budgetSetGraphData, findUserBudget } from "helpers/budget";
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
  const [ budget, dispatchBudget ] = useReducer(budgetReducer, findUserBudget(state, localStorage.getItem('id') || 1));
  const [ goal, dispatchGoal ] = useReducer(budgetGoalsReducer, {
    id: [],
    select: []
  });
  const [ toggle, dispatchToggle ] = useReducer(budgetToggleReducer, {
    planner: true,
    goal: false,
    pvat: true,
    pvac: true,
    pvas: true,
    botg: true

  });
  const [range, setRange] = useState(12);
  const [portfolio, setPortfolio] = useState(1);
  const { width: winWidth } = useWindowDimensions();
  const [error, setError] = useState("");

  const expenseKey = ['entertainment', 'medical', 'debt', 'misc', 'transporation', 'home', 'food', 'utilities'];
  const budgetKey = [budget.c_entr, budget.c_medi, budget.c_debt, budget.c_misc, budget.c_tran, budget.c_hous, budget.c_food, budget.c_util];
  const colors = ["#ffe7ea", "#c4d2c7", "#cce3e1", "#add0e0", "#b6bffa", "#f5c2b3", "#dfe6c3", "#f5e0b3"];

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
    const user = localStorage.getItem("id");
    let datez= `${state.date.month}+${state.date.year}+${user}`

    Promise.all([
      axios.get(`http://localhost:8001/api/expenses/${datez}`),
      axios.get(`http://localhost:8001/api/expensestotal/${datez}`),
      axios.get("http://localhost:8001/api/budget"),
      axios.get(`http://localhost:8001/api/goals/${user}`),
      axios.get(`http://localhost:8001/api/users/${user}`)

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
      if (bud.user_id === localStorage.getItem('id') && bud !== budget) {
        dispatchBudget({
          type: "ALL",
          budget: findUserBudget(state, localStorage.getItem('id'))
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
    const user = localStorage.getItem("id");
    let datez = `${date.month}+${date.year}+${user}`;

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

  const scrollCheck = function() {
    if (winWidth >= 992) {
      if (document.getElementById('budgetBG')) document.getElementById('budgetBG').style.top = document.scrollingElement.scrollTop / 250 + 'px';
    } else {
      if (document.getElementById('budgetBG')) document.getElementById('budgetBG').style.top = document.scrollingElement.scrollTop + 'px';
    }
  }

  scrollCheck();
  window.addEventListener('scroll', scrollCheck);

  /* --------------- */
  /* Chart Data Prep */
  /* --------------- */

  const formatDataForPVAT = function(budgetKey, totalExpenses) {
    const result = [];
    const plan = {name: 'plan'};
    const actual = {name: 'actual'};

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

    for (const g of goal) {
      if (g.type === "LE") {
        if (parseInt(g.amount) > height) height = g.amount;
      }
    }

    return Math.floor(height * 1.1);
  } 

  const setDisplayForPVAC = function(budgetKey, totalExpenses) {
    let height = 0;

    for (const budget of budgetKey) {
      if (parseInt(budget) > height) height = budget;
    }

    for (const expense of totalExpenses) {
      if (parseInt(expense.sum) > height) height = expense.sum;
    }

    return Math.floor(height * 1.1)
  }

  const setDisplayForPVAS = function(budgetKey, totalExpenses, inc, goal) {
    let height, plan, actual = 0;

    for (const budget of budgetKey) {
      plan += parseInt(budget)
    }

    for (const expense of totalExpenses) {
      actual += parseInt(expense.sum);
    }

    plan = Math.abs(inc - plan);
    actual = Math.abs(actual - inc);

    if (plan > actual) height =  plan;
    else height = actual;

    for (const g of goal) {
      if (g.type === "SPM") {
        if (parseInt(g.amount) > height) height = g.amount;
      }
    }

    const result =  {yMax: Math.floor(height * 1.25), yMin: Math.floor(-height * 1.25)};
    return result;
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

  const PVATreferenceLinesY = goal.select.map(g => {
    if (g.type === "LE") {
      return (
        <ReferenceLine key={g.id*100+1} y={g.amount} stroke="red" />
      );
    }
  })

  const PVASreferenceLinesY = goal.select.map(g => {
    if (g.type === "SPM") {
      return (
        <ReferenceLine key={g.id*100+1} y={g.amount} stroke="red" />
      );
    }
  })

  const BOTGreferenceLinesY = goal.select.map(g => {
    if (g.type === "SFP") {
      const d = g.date.split('-');
      return (
        <ReferenceLine key={g.id*100+1} y={g.amount} stroke="red" />
      );
    }
  })

  const BOTGreferenceLinesX = goal.select.map(g => {
    if (g.type === "SFP") {
      const d = g.date.split('-');
      return(
        <ReferenceLine key={g.id*100+2} x={`${d[1]} / ${d[2]}`} stroke="red" />
      );
    }
  });

  const PVATdata = expenseKey.map((value, i) => { 
    return(
      <Bar key={i} dataKey={expenseKey[i]} stackId="a" fill={colors[i]} /> 
    )
  });

  /* ---------------------- */
  /* Cards Size Adjustments */
  /* ---------------------- */

  const cardSize = function(width) {
    let size = {card: 600, graphX: 450, graphY: 200}
    if (width < 385) {
      size.card = 300;
      size.graphX = 270;
      size.graphY = 180;
    } else if (width >= 385 && width < 450) {
      size.card = 350;
      size.graphX = 300;
      size.graphY = 200;
    } else if (width >= 450 && width < 550) {
      size.card = 400;
      size.graphX = 360;
      size.graphY = 230;
    } else if (width >= 550 && width < 700) {
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
    } else if (width >= 992 && width < 1276) {
      size.card = 600;
      size.graphX = 540;
      size.graphY = 300;
    } else if (width >= 1276) {
      size.card = 500;
      size.graphX = 440;
      size.graphY = 260;
    }

    return size;
  }

  const cardLoc = function(toggle, loc, wide) {
    if (wide === false) {
      return ` budgetContent${loc}`
    }

    if (loc === "AB") {
      if (toggle.pvat === false && toggle.pvac === false && toggle.pvas === false && toggle.botg === false) {
        return ` budgetContentAC`
      }
      return ` budgetContentAB`
    }
    if (loc === "B") {
      if (toggle.planner === false) return ``
      return ``
    }
    if (loc === "C") {
      if (toggle.planner === true || toggle.goal === true) return ` budgetContentD`
      else if (toggle.pvac === false && toggle.pvas === false && toggle.botg === false) return ` budgetContentCD`
      return ` budgetContentC`
    }
    if (loc === "D") {
      if (toggle.planner === true || toggle.goal === true) return ` budgetContentF`
      else if (toggle.pvat === false && toggle.pvas === false && toggle.botg === false) return ` budgetContentCD`
      else if (toggle.pvat === false && toggle.botg === false) return ` budgetContentD`
      else if (toggle.pvat === false && toggle.pvas === false) return ` budgetContentC`
      else if (toggle.pvat === false) return ` budgetContentD`
      return ` budgetContentD`
    }
    if (loc === "E") {
      if (toggle.planner === true || toggle.goal === true) return ` budgetContentG`
      else if (toggle.pvac === false && toggle.pvat === false && toggle.botg === false) return ` budgetContentCD`
      else if (toggle.pvat === false && toggle.botg === false) return ` budgetContentC`
      else if (toggle.pvac === false && toggle.botg === false) return ` budgetContentD`
      else if (toggle.pvat === false) return ` budgetContentC`
      else if (toggle.pvac === false) return ` budgetContentD`
      return ` budgetContentE`
    }
    if (loc === "F") {
      if (toggle.planner === true || toggle.goal === true) {
        if (toggle.pvac === false && toggle.pvas === false && toggle.pvat === false) return ` budgetContentD`
        return ` budgetContentH`
      } else if (toggle.pvac === false && toggle.pvas === false && toggle.pvat === false) return ` budgetContentCD`
      else if (toggle.pvac === false && toggle.pvas === false) return ` budgetContentD`
      else if (toggle.pvat === false && toggle.pvas === false) return ` budgetContentD`
      else if (toggle.pvat === false && toggle.pvac === false) return ` budgetContentD`
      return ` budgetContentF`
    }
  }

  /* --------------- */
  /* Render Contents */
  /* --------------- */

  return (
    <div className="budgetWrap">
      <nav className="budgetNav">
        <div className="budgetNavA">
          <MonthPicker currentMonth={state.date} chgMonth={chgMonth} />
        </div>
        {winWidth >= 450 ?
        <div className="budgetNavB budgetButtons">
          <BudgetInputMenu
            toggle={toggle}
            dispatch={dispatchToggle}
          />
          <BudgetChartMenu
            toggle={toggle}
            dispatch={dispatchToggle}
          />
        </div> :
        <div className="budgetButtons">
          <div className="budgetNavB">
            <BudgetInputMenu
              toggle={toggle}
              dispatch={dispatchToggle}
            />
          </div>
          <div className="budgetNavC">
            <BudgetChartMenu
              toggle={toggle}
              dispatch={dispatchToggle}
            />
          </div>
        </div>
        }
      </nav>
      <div className="budgetContents">
        <div className="budgetContentAF">
          <div id="budgetBG" className="budgetBG"></div>
        </div>
        <div className={"budgetContent" + (cardLoc(toggle, "AB", winWidth >= 1276))}>
          <div className={(cardLoc(toggle, "A", winWidth >= 1276))}>
            {toggle.planner ?
              cardSize(winWidth).card >= 600 ?
                <BudgetPlannerA
                  budget={budget}
                  updateBudgetLocal={dispatchBudget}
                  validate={validatePlanner}
                  error={error}
                  size={cardSize(winWidth).card}
                /> :
                <BudgetPlannerB
                budget={budget}
                updateBudgetLocal={dispatchBudget}
                validate={validatePlanner}
                error={error}
                size={cardSize(winWidth).card}
              />
            : null}
          </div>
          <div className={(cardLoc(toggle, "B", winWidth >= 1276))}>
            {toggle.goal ?
            <BudgetGoals
              goal={goal}
              selectGoal={dispatchGoal}
              goals={state.goals}
              budget={budget}
              updateBudgetLocal={dispatchBudget}
              size={cardSize(winWidth).card}
            />
            : null}
          </div>
        </div>
        <div className={"budgetContent" + (cardLoc(toggle, "C", winWidth >= 1276))}>
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
                  <YAxis domain={[0, setDisplayForPVAT(budgetKey, state.totalExpenses, goal.select)]} />
                  <Tooltip />
                  <Legend />
                  {PVATdata}
                  {PVATreferenceLinesY}
                </BarChart>
              </ResponsiveContainer>
              }
            />
          : null}
        </div>
        <div className={"budgetContent" + (cardLoc(toggle, "D", winWidth >= 1276))}>
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
                  <YAxis domain={[0, setDisplayForPVAC(budgetKey, state.totalExpenses)]} />
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
          <div className={"budgetContent" + (cardLoc(toggle, "E", winWidth >= 1276))}>
            {toggle.pvas ?
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
                    <YAxis domain={[setDisplayForPVAS(budgetKey, state.totalExpenses, budget.income, goal.select).yMax, 1000]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Plan" fill="#ffe7ea" />
                    <Bar dataKey="Actual" fill="#c4d2c7" />
                    {PVASreferenceLinesY}
                  </BarChart>
                </ResponsiveContainer>
              }
            />
          : null}
        </div>
        <div className={"budgetContent" + (cardLoc(toggle, "F", winWidth >= 1276))}>
          {toggle.botg ?
          <BudgetGraphCard
            title="Budget Plan summary"
            category="insert other budget informations here"
            range={range}
            setRange={setRange}
            size={cardSize(winWidth).card}
            content={
              <ResponsiveContainer minWidth='100%' minHeight={cardSize(winWidth).graphY} maxHeight={cardSize(winWidth).graphY}>
                <AreaChart 
                  height={cardSize(winWidth).graphY}
                  data={budgetSetGraphData(budget, range, portfolio)}
                  margin={{ top: 15, right: 40, left: 0, bottom: 0 }}
                >
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
                  <Area type="monotone" dataKey="saving" stackId="1" stroke="#c4d2c7" fill="#c4d2c7" />
                  <Area type="monotone" dataKey="portfolio" stackId="1" stroke="#ffe7ea" fill="#ffe7ea" />
                  {BOTGreferenceLinesY}
                  {BOTGreferenceLinesX}
                </AreaChart>
              </ResponsiveContainer>
            }
          />
          : null}
        </div>
      </div>
    </div>
  );
}

export default Budget;
