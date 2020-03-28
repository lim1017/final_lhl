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
import { budgetSetGraphData, findUserBudget, budgetCalc } from "helpers/budget";
import useWindowDimensions from "helpers/windowDimensions";

import MonthPicker from "components/MonthPicker/MonthPicker.jsx";
import {
  AreaChart,
  Area,
  Legend,
  BarChart,
  Bar,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label
} from "recharts";

/* --------------- */
/* Budget Function */
/* --------------- */
function Budget(props) {
  /* ------------------ */
  /* States & Variables */
  /* ------------------ */

  const { state, dispatch } = useContext(appDataContext);
  // const [state, dispatch] = useReducer(reducerz, globalStateDefault);
  const [budget, dispatchBudget] = useReducer(
    budgetReducer,
    findUserBudget(state, localStorage.getItem("id") || 1)
  );
  const [goal, dispatchGoal] = useReducer(budgetGoalsReducer, {
    id: [],
    select: [],
    range: 1
  });
  const [toggle, dispatchToggle] = useReducer(budgetToggleReducer, {
    planner: true,
    goal: true,
    pvat: true,
    pvac: true,
    pvas: true,
    botg: true
  });
  const [info, dispatchInfo] = useReducer(budgetToggleReducer, {
    planner: false,
    goal: false,
    pvat: false,
    pvac: false,
    pvas: false,
    botg: false
  });
  const [range, setRange] = useState(12);
  const [portfolio, setPortfolio] = useState(1);
  const { width: winWidth } = useWindowDimensions();
  const [error, setError] = useState("");

  const expenseKey = [
    "Entertainment",
    "Medical",
    "Debt",
    "Misc",
    "Transportation",
    "Home",
    "Food",
    "Utilities"
  ];
  const budgetKey = [
    budget.c_entr,
    budget.c_medi,
    budget.c_debt,
    budget.c_misc,
    budget.c_tran,
    budget.c_hous,
    budget.c_food,
    budget.c_util
  ];
  const colors = [
    "#ffe7ea",
    "#fffbcf",
    "#dbf0ff",
    "#D0FFDE",
    "#e5dbff",
    "#FAEEC5",
    "#defafa",
    "#dffbd4"
  ];

  /* ------------------------------------ */
  /* Init & useEffects & Database Updates */
  /* ------------------------------------ */

  if (state.users && state.users.length > 0) {
    for (const user of state.users) {
      if (
        // user.id === userLogged &&
        user.portfolioreturn > 1 &&
        user.portfolioreturn !== portfolio
      ) {
        setPortfolio(user.portfolioreturn);
      }
    }
  }

  useEffect(() => {
    const user = localStorage.getItem("id");
    let datez = `${state.date.month}+${state.date.year}+${user}`;

    Promise.all([
      axios.get(`http://localhost:8001/api/expenses/${datez}`),
      axios.get(`http://localhost:8001/api/expensestotal/${datez}`),
      axios.get(`http://localhost:8001/api/budget/${user}`),
      axios.get(`http://localhost:8001/api/goals/${user}`),
      axios.get(`http://localhost:8001/api/users/${user}`)
    ])
      .then(response => {
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
      if (
        bud.user_id === parseInt(localStorage.getItem("id")) &&
        bud !== budget
      ) {
        dispatchBudget({
          type: "ALL",
          budget: findUserBudget(state, localStorage.getItem("id"))
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
    const user = localStorage.getItem("id");
    const newBud = {
      ...budget
    };

    axios
      .put(`http://localhost:8001/api/budget/${user}`, newBud)
      .then(res1 => {
        axios.get(`http://localhost:8001/api/budget/${user}`).then(res2 => {
          dispatch({
            ...state,
            type: "SET_DATA",
            budget: res2.data
          });

          if (state.budget.length === 0) {
            updateLit();
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  function updateLit() {
    const userId = localStorage.getItem("id");

    Promise.all([
      axios.put(`http://localhost:8001/api/users/updateliteracy`, {
        userId,
        lit: 25
      })
    ])
      .then(res => {
        axios.get(`http://localhost:8001/api/users/${userId}`).then(resz => {
          dispatch({
            type: "SET_USER",
            users: resz.data
          });
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  const validatePlanner = function() {
    if (isNaN(budget.base)) {
      setError("base required");
      return;
    } else if (isNaN(budget.income)) {
      setError("income required");
      return;
    } else if (isNaN(budget.c_hous)) {
      setError("housing expenses required");
      return;
    } else if (isNaN(budget.c_tran)) {
      setError("transport expenses required");
      return;
    } else if (isNaN(budget.c_food)) {
      setError("food expenses required");
      return;
    } else if (isNaN(budget.c_util)) {
      setError("utility expenses required");
      return;
    } else if (isNaN(budget.c_entr)) {
      setError("entertainment expenses required");
      return;
    } else if (isNaN(budget.c_medi)) {
      setError("medical expenses required");
      return;
    } else if (isNaN(budget.c_debt)) {
      setError("debt expenses required");
      return;
    } else if (isNaN(budget.c_misc)) {
      setError("misc expenses required");
      return;
    }

    setError("");
    savePlanner();
  };

  const onDispatchToggle = function(data) {
    if (winWidth < 992) {
      document.scrollingElement.scrollTop = 0;
    }
    dispatchToggle(data);
  };

  const scrollCheck = function() {
    if (winWidth >= 992) {
      if (document.getElementById("budgetBG"))
        document.getElementById("budgetBG").style.top =
          document.scrollingElement.scrollTop / 250 + "px";
    } else {
      if (document.getElementById("budgetBG"))
        document.getElementById("budgetBG").style.top =
          document.scrollingElement.scrollTop + "px";
    }
  };

  scrollCheck();
  window.addEventListener("scroll", scrollCheck);

  /* --------------- */
  /* Chart Data Prep */
  /* --------------- */

  const formatNumbers = function(t) {
    if (t >= 1000000) return `$${Math.round(t / 100000) / 10}M`;
    if (t >= 1000 || t <= -1000) return `$${Math.round(t / 100) / 10}K`;
    if (t <= -1000000) return `$${Math.round(t / 100000) / 10}M`;
    return `$${t}`;
  };

  const formatDataForPVAT = function(budgetKey, totalExpenses) {
    const result = [];
    const Budgeted = { name: "Budgeted" };
    const Actual = { name: "Actual" };

    for (let i = 0; i < expenseKey.length; i++) {
      Budgeted[`${expenseKey[i]}`] = budgetKey[i];
      for (const expense of totalExpenses) {
        if (expense.type === expenseKey[i]) {
          Actual[`${expenseKey[i]}`] = expense.sum;
        }
      }
    }

    result.push(Budgeted);
    result.push(Actual);

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
      result.push({
        name: expenseKey[i],
        Budgeted: budgetKey[i],
        Actual: actualData
      });
    }

    return result;
  };

  const formatDataForPVAS = function(budgetKey, totalExpenses) {
    const result = [
      { name: "Plan", Plan: budget.income, Actual: budget.income }
    ];

    for (let i = 0; i < budgetKey.length; i++) {
      result[0].Plan -= parseInt(budgetKey[i]);
    }

    for (let i = 0; i < totalExpenses.length; i++) {
      result[0].Actual -= parseInt(totalExpenses[i].sum);
    }

    return result;
  };

  const setDisplayForPVAT = function(budgetKey, totalExpenses, goal) {
    let height,
      plan,
      actual = 0;

    for (const budget of budgetKey) {
      plan += parseInt(budget);
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
  };

  const setDisplayForPVAC = function(budgetKey, totalExpenses) {
    let height = 0;

    for (const budget of budgetKey) {
      if (parseInt(budget) > height) height = budget;
    }

    for (const expense of totalExpenses) {
      if (parseInt(expense.sum) > height) height = expense.sum;
    }

    return Math.floor(height * 1.1);
  };

  const setDisplayForPVAS = function(budgetKey, totalExpenses, inc, goal) {
    let minHeight = 0;
    let maxHeight = 0;
    let plan = 0;
    let actual = 0;

    for (const budget of budgetKey) {
      plan += parseInt(budget);
    }

    for (const expense of totalExpenses) {
      actual += parseInt(expense.sum);
    }

    // plan = Math.abs(inc - plan);
    // actual = Math.abs(actual - inc);

    if (plan > actual) {
      maxHeight = inc - actual;
      minHeight = inc - plan;
    } else {
      minHeight = inc - actual;
      maxHeight = inc - plan;
    }

    for (const g of goal) {
      if (g.type === "SPM") {
        if (parseInt(g.amount) > maxHeight) maxHeight = g.amount;
      }
    }

    // if both values are below 0
    if (maxHeight <= 0 && minHeight <= 0) maxHeight = 0;
    else if (minHeight >= 0) minHeight = 0;
    else {
      if (Math.abs(minHeight) < Math.abs(maxHeight)) minHeight = -maxHeight;
      else maxHeight = -minHeight;
    }

    const result = {
      yMax: Math.floor(maxHeight * 1.25),
      yMin: Math.floor(minHeight * 1.25)
    };

    return result;
  };

  const setDisplayForBOTG = function(bud, goal) {
    const res = {
      yMin: parseInt(bud.base),
      yMax: parseInt(bud.base) * 2
    };

    for (const g of goal) {
      if (g.type === "SFP") {
        if (parseInt(g.amount) > res.yMax) res.yMax = g.amount;
        if (parseInt(g.amount) < res.yMin) res.yMin = g.amount;
      }
    }

    res.yMax = Math.floor(res.yMax * 1.1);

    return res;
  };

  const PVATreferenceLinesY = goal.select.map(g => {
    if (g.type === "LE") {
      return (
        <ReferenceLine
          key={g.id * 100 + 1}
          y={g.amount}
          stroke="red"
          label={{
            position: "left",
            value: `${formatNumbers(g.amount)}`,
            fontSize: 10,
            fill: "rgba(255, 255, 255, 1)"
          }}
        />
      );
    }
  });

  const PVASreferenceLinesY = goal.select.map(g => {
    if (g.type === "SPM") {
      return (
        <ReferenceLine
          key={g.id * 100 + 1}
          y={g.amount}
          stroke="red"
          label={{
            position: "left",
            value: `${formatNumbers(g.amount)}`,
            fontSize: 10,
            fill: "rgba(255, 255, 255, 1)"
          }}
        />
      );
    }
  });

  const BOTGreferenceLinesY = goal.select.map(g => {
    if (g.type === "SFP") {
      const d = g.date.split("-");
      return (
        <ReferenceLine
          key={g.id * 100 + 1}
          y={g.amount}
          stroke="red"
          label={{
            position: "left",
            value: `${formatNumbers(g.amount)}`,
            fontSize: 10,
            fill: "rgba(255, 255, 255, 1)"
          }}
        />
      );
    }
  });

  const BOTGreferenceLinesX = budgetSetGraphData(
    budget,
    range,
    portfolio,
    goal.select
  ).goalCheck.map(g => {
    if (g.goal.type === "SFP") {
      if (g.type === "AWOI") {
        return (
          <ReferenceLine
            key={g.goal.id + 1000}
            x={g.x}
            stroke="#FFFF00"
            // label={{ position: 'bottom',  value: `${g.x.split(' ')[1]} ${g.x.split(' ')[2]}`, fontSize: 10 }}
          />
        );
      } else if (g.type === "AAWI") {
        return (
          <ReferenceLine key={g.goal.id + 1100} x={g.x} stroke="#496aff" />
        );
      } else if (g.type === "DATE") {
        return <ReferenceLine key={g.goal.id + 1200} x={g.x} stroke="red" />;
      }
    }
  });

  const PVATdata = expenseKey.map((value, i) => {
    return <Bar key={i} dataKey={expenseKey[i]} stackId="a" fill={colors[i]} />;
  });

  /* ---------------------- */
  /* Cards Size Adjustments */
  /* ---------------------- */

  const cardSize = function(width) {
    function sizeA() {
      size.card = 300;
      size.graphX = 270;
      size.graphY = 180;
    }
    function sizeB() {
      size.card = 350;
      size.graphX = 300;
      size.graphY = 200;
    }
    function sizeC() {
      size.card = 400;
      size.graphX = 360;
      size.graphY = 230;
    }
    function sizeD() {
      size.card = 500;
      size.graphX = 440;
      size.graphY = 260;
    }
    function sizeE() {
      size.card = 600;
      size.graphX = 540;
      size.graphY = 300;
    }
    function sizeF() {
      size.card = 800;
      size.graphX = 720;
      size.graphY = 480;
    }
    let size = { card: 600, graphX: 450, graphY: 200 };

    if (width < 385) sizeA();
    else if (width >= 385 && width < 450) sizeB();
    else if (width >= 450 && width < 550) sizeC();
    else if (width >= 550 && width < 700) sizeD();
    else if (width >= 700 && width < 890) sizeE();
    else if (width >= 890 && width < 992) sizeF();
    else if (width >= 992 && width < 1276) sizeE();
    else if (width >= 1276 && width < 1600) sizeD();
    else if (width >= 1600 && width < 1920) sizeE();
    else if (width >= 1920) sizeF();

    return size;
  };

  const cardLoc = function(toggle, loc, wide) {
    if (wide === false) {
      return ` budgetContent${loc}`;
    }

    if (loc === "AB") {
      if (
        toggle.pvat === false &&
        toggle.pvac === false &&
        toggle.pvas === false &&
        toggle.botg === false
      ) {
        return ` budgetContentAC`;
      }
      return ` budgetContentAB`;
    }
    if (loc === "B") {
      if (toggle.planner === false) return ``;
      return ``;
    }
    if (loc === "C") {
      if (toggle.planner === true || toggle.goal === true)
        return ` budgetContentD`;
      else if (
        toggle.pvac === false &&
        toggle.pvas === false &&
        toggle.pvat === false
      )
        return ` budgetContentCD`;
      else if (toggle.botg === false) return " budgetContentF";
      return ` budgetContentC`;
    }
    if (loc === "D") {
      if (toggle.planner === true || toggle.goal === true)
        return ` budgetContentF`;
      else if (
        toggle.pvac === false &&
        toggle.pvas === false &&
        toggle.botg === false
      )
        return ` budgetContentCD`;
      else if (toggle.pvac === false && toggle.botg === false)
        return ` budgetContentD`;
      else if (toggle.botg === false && toggle.pvas === false)
        return ` budgetContentC`;
      else if (toggle.botg === false) return ` budgetContentC`;
      else if (toggle.pvat === false) return " budgetContentF";
      return ` budgetContentD`;
    }
    if (loc === "E") {
      if (toggle.planner === true || toggle.goal === true)
        return ` budgetContentG`;
      else if (
        toggle.pvas === false &&
        toggle.pvat === false &&
        toggle.botg === false
      )
        return ` budgetContentCD`;
      else if (toggle.pvat === false && toggle.botg === false)
        return ` budgetContentD`;
      else if (toggle.pvas === false && toggle.botg === false)
        return ` budgetContentD`;
      else if (toggle.pvac === false) return ` budgetContentF`;
      else if (toggle.botg === false) return ` budgetContentD`;
      else if (toggle.pvat === false) return ` budgetContentD`;
      return ` budgetContentF`;
    }
    if (loc === "F") {
      if (toggle.planner === true || toggle.goal === true) {
        if (
          toggle.pvac === false &&
          toggle.botg === false &&
          toggle.pvat === false
        )
          return ` budgetContentD`;
        return ` budgetContentH`;
      } else if (
        toggle.pvac === false &&
        toggle.botg === false &&
        toggle.pvat === false
      )
        return ` budgetContentCD`;
      else if (toggle.pvat === false && toggle.botg === false)
        return ` budgetContentC`;
      else if (toggle.pvac === false && toggle.botg === false)
        return ` budgetContentC`;
      else if (toggle.pvat === false && toggle.pvac === false)
        return ` budgetContentD`;
      return ` budgetContentE`;
    }
  };

  console.log("winWidth", winWidth);

  /* --------------- */
  /* Render Contents */
  /* --------------- */

  return (
    <div className="budgetWrap">
      <nav className="budgetNav">
        <div className="budgetNavA">
          <MonthPicker currentMonth={state.date} chgMonth={chgMonth} />
        </div>
        {winWidth >= 450 ? (
          <div className="budgetNavB budgetButtons">
            <BudgetInputMenu toggle={toggle} dispatch={dispatchToggle} />
            <BudgetChartMenu toggle={toggle} dispatch={dispatchToggle} />
          </div>
        ) : (
          <div className="budgetButtons">
            <div className="budgetNavB">
              <BudgetInputMenu toggle={toggle} dispatch={dispatchToggle} />
            </div>
            <div className="budgetNavC">
              <BudgetChartMenu toggle={toggle} dispatch={dispatchToggle} />
            </div>
          </div>
        )}
      </nav>
      <div className="budgetContents">
        <div className="budgetContentAF">
          <div id="budgetBG" className="budgetBG"></div>
        </div>
        <div
          className={"budgetContent" + cardLoc(toggle, "AB", winWidth >= 1276)}
        >
          <div className={cardLoc(toggle, "A", winWidth >= 1276)}>
            {toggle.planner ? (
              cardSize(winWidth).card >= 600 ? (
                <BudgetPlannerA
                  budget={budget}
                  updateBudgetLocal={dispatchBudget}
                  validate={validatePlanner}
                  error={error}
                  size={cardSize(winWidth).card}
                  dispatch={onDispatchToggle}
                  dispatchInfo={dispatchInfo}
                  dispatchType="PLANNER"
                  info={info}
                />
              ) : (
                <BudgetPlannerB
                  budget={budget}
                  updateBudgetLocal={dispatchBudget}
                  validate={validatePlanner}
                  error={error}
                  size={cardSize(winWidth).card}
                  dispatch={onDispatchToggle}
                  dispatchInfo={dispatchInfo}
                  dispatchType="PLANNER"
                  info={info}
                />
              )
            ) : null}
          </div>
          <div className={cardLoc(toggle, "B", winWidth >= 1276)}>
            {toggle.goal ? (
              <BudgetGoals
                goal={goal}
                selectGoal={dispatchGoal}
                goals={state.goals}
                budget={budget}
                updateBudgetLocal={dispatchBudget}
                size={cardSize(winWidth).card}
                dispatch={onDispatchToggle}
                dispatchInfo={dispatchInfo}
                dispatchType="GOAL"
                info={info}
                setRange={setRange}
              />
            ) : null}
          </div>
          <div>
            {toggle.pvas &&
            winWidth >= 1276 &&
            // if one of left side is open and two + of right side is onpen
            ((((toggle.planner && !toggle.goal) ||
              (!toggle.planner && toggle.goal)) &&
              ((toggle.pvat && toggle.pvac) ||
                (toggle.pvat && toggle.botg) ||
                (toggle.pvac && toggle.botg))) ||
              // if two of left side is open and all of right side is open
              (toggle.planner &&
                toggle.goal &&
                toggle.pvat &&
                toggle.pvac &&
                toggle.botg)) ? (
              <CardBudget
                title="Budgeted vs Actual Monthly Saving"
                size={cardSize(winWidth).card}
                dispatch={onDispatchToggle}
                dispatchInfo={dispatchInfo}
                dispatchType="PVAS"
                content={
                  <ResponsiveContainer
                    minWidth="100%"
                    minHeight={cardSize(winWidth).graphY}
                    maxHeight={cardSize(winWidth).graphY}
                  >
                    {info.pvas ? (
                      <div>
                        <p>
                          This graph compares monthly surplus from Budget
                          Planner card and monthly surplus from actual expenses
                          from Expenses tab, calculated by subtracting actual
                          expenses from budgeted monthly income.
                        </p>
                        <p>
                          When a Save per Month type of goal is checked from
                          Goals card, the goal's amount will be displayed on
                          graph.
                        </p>
                        <p>
                          Press ? icon to go back to Budgeted vs Actual Monthly
                          Saving graph.
                        </p>
                      </div>
                    ) : (
                      <BarChart
                        height={cardSize(winWidth).graphY}
                        data={formatDataForPVAS(budgetKey, state.totalExpenses)}
                        margin={{ top: 15, right: 40, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis stroke="#e7e7e7" dataKey="name" />
                        <YAxis
                          stroke="#e7e7e7"
                          domain={[
                            setDisplayForPVAS(
                              budgetKey,
                              state.totalExpenses,
                              budget.income,
                              goal.select
                            ).yMin,
                            setDisplayForPVAS(
                              budgetKey,
                              state.totalExpenses,
                              budget.income,
                              goal.select
                            ).yMax
                          ]}
                          tickFormatter={t => {
                            return formatNumbers(t);
                          }}
                        />
                        <Tooltip
                          cursor={{ fill: "transparent" }}
                          contentStyle={{ backgroundColor: "#272727" }}
                        />
                        <Legend />
                        <Bar dataKey="Plan" fill="#ffe7ea" />
                        <Bar dataKey="Actual" fill="#c4d2c7" />
                        {PVASreferenceLinesY}
                        <ReferenceLine key={999} y={0} stroke="black" />
                      </BarChart>
                    )}
                  </ResponsiveContainer>
                }
              />
            ) : null}
          </div>
        </div>
        <div
          className={"budgetContent" + cardLoc(toggle, "D", winWidth >= 1276)}
        >
          {toggle.pvat ? (
            <CardBudget
              title="Budgeted vs Actual Expenses"
              size={cardSize(winWidth).card}
              dispatch={onDispatchToggle}
              dispatchInfo={dispatchInfo}
              dispatchType="PVAT"
              content={
                <ResponsiveContainer
                  minWidth="100%"
                  minHeight={cardSize(winWidth).graphY}
                  maxHeight={cardSize(winWidth).graphY}
                >
                  {info.pvat ? (
                    <div>
                      <p>
                        This graph compares your monthly budgeted expenses to
                        your actual expenses for a given month.
                      </p>
                      <p>
                        When a "Limit Expenses" goal is checked, the goal's
                        amount will be displayed on graph.
                      </p>
                      <p>
                        You can change the month on the left side of top
                        Navigation bar.
                      </p>
                      <p>Press ? to go back.</p>
                    </div>
                  ) : (
                    <BarChart
                      height={cardSize(winWidth).graphY}
                      data={formatDataForPVAT(budgetKey, state.totalExpenses)}
                      margin={{ top: 15, right: 40, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis stroke="#e7e7e7" dataKey="name" />
                      <YAxis
                        stroke="#e7e7e7"
                        domain={[
                          0,
                          setDisplayForPVAT(
                            budgetKey,
                            state.totalExpenses,
                            goal.select
                          )
                        ]}
                        tickFormatter={t => {
                          return formatNumbers(t);
                        }}
                      />

                      <Tooltip
                        cursor={{ fill: "transparent" }}
                        contentStyle={{ backgroundColor: "#272727" }}
                      />
                      <Legend />
                      {PVATdata}
                      {PVATreferenceLinesY}
                    </BarChart>
                  )}
                </ResponsiveContainer>
              }
            />
          ) : null}
        </div>
        <div
          className={"budgetContent" + cardLoc(toggle, "E", winWidth >= 1276)}
        >
          {toggle.pvac ? (
            <CardBudget
              title="Budgeted vs Actual Expenses by Category"
              size={cardSize(winWidth).card}
              dispatch={onDispatchToggle}
              dispatchInfo={dispatchInfo}
              dispatchType="PVAC"
              content={
                <ResponsiveContainer
                  minWidth="100%"
                  minHeight={cardSize(winWidth).graphY}
                  maxHeight={cardSize(winWidth).graphY}
                >
                  {info.pvac ? (
                    <div>
                      <p>
                        This graph compares your monthly budgeted expenses and
                        your actual expenses for a given month.
                      </p>
                      <p>
                        You can change the month on the left side of top
                        Navigation bar.
                      </p>
                      <p>Press ? to go back.</p>
                    </div>
                  ) : (
                    <BarChart
                      height={cardSize(winWidth).graphY}
                      data={formatDataForPVAC(budgetKey, state.totalExpenses)}
                      margin={{ top: 15, right: 40, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        stroke="#e7e7e7"
                        dataKey="name"
                        angle={-45}
                        interval={0}
                        height={80}
                        textAnchor="end"
                      />
                      <YAxis
                        stroke="#e7e7e7"
                        domain={[
                          0,
                          setDisplayForPVAC(budgetKey, state.totalExpenses)
                        ]}
                        tickFormatter={t => {
                          return formatNumbers(t);
                        }}
                      />
                      <Tooltip
                        cursor={{ fill: "transparent" }}
                        contentStyle={{ backgroundColor: "#272727" }}
                      />
                      <Legend />
                      <Bar dataKey="Budgeted" fill="#ffe7ea" />
                      <Bar dataKey="Actual" fill="#c4d2c7" />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              }
            />
          ) : null}
        </div>
        <div
          className={"budgetContent" + cardLoc(toggle, "F", winWidth >= 1276)}
        >
          {(toggle.pvas && winWidth < 1276) ||
          (toggle.pvas &&
            // if two of left side open and less than all of right side is open
            ((toggle.planner &&
              toggle.goal &&
              (!toggle.pvat || !toggle.pvac || !toggle.botg)) ||
              // if one of left side is open and less than two of right side is open
              (((toggle.planner && !toggle.goal) ||
                (!toggle.planner && toggle.goal)) &&
                ((!toggle.pvat && !toggle.pvac) ||
                  (!toggle.pvat && !toggle.botg) ||
                  (!toggle.pvac && !toggle.botg))) ||
              // if both right side of closed
              (!toggle.planner && !toggle.goal))) ? (
            <CardBudget
              title="Budgeted vs Actual Monthly Saving"
              size={cardSize(winWidth).card}
              dispatch={onDispatchToggle}
              dispatchInfo={dispatchInfo}
              dispatchType="PVAS"
              content={
                <ResponsiveContainer
                  minWidth="100%"
                  minHeight={cardSize(winWidth).graphY}
                  maxHeight={cardSize(winWidth).graphY}
                >
                  {info.pvas ? (
                    <div>
                      <p>
                        This graph compares your monthly surplus (Budget
                        Planner) and monthly surplus from your expenses
                        (Expenses Tab). It is calculated by subtracting your
                        actual expenses from yourbudgeted monthly income.
                      </p>
                      <p>
                        When a "Saving per Month" type of goal is checked from
                        the Goals card, the goal's amount will be displayed on
                        this graph.
                      </p>
                      <p>Press ? to go back.</p>
                    </div>
                  ) : (
                    <BarChart
                      height={cardSize(winWidth).graphY}
                      data={formatDataForPVAS(budgetKey, state.totalExpenses)}
                      margin={{ top: 15, right: 40, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis stroke="#e7e7e7" dataKey="name" />
                      <YAxis
                        stroke="#e7e7e7"
                        domain={[
                          setDisplayForPVAS(
                            budgetKey,
                            state.totalExpenses,
                            budget.income,
                            goal.select
                          ).yMin,
                          setDisplayForPVAS(
                            budgetKey,
                            state.totalExpenses,
                            budget.income,
                            goal.select
                          ).yMax
                        ]}
                        tickFormatter={t => {
                          return formatNumbers(t);
                        }}
                      />

                      <Tooltip
                        cursor={{ fill: "transparent" }}
                        contentStyle={{ backgroundColor: "#272727" }}
                      />
                      <Legend />
                      <Bar dataKey="Plan" fill="#ffe7ea" />
                      <Bar dataKey="Actual" fill="#c4d2c7" />
                      {PVASreferenceLinesY}
                      <ReferenceLine key={999} y={0} stroke="black" />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              }
            />
          ) : null}
        </div>
        <div
          className={"budgetContent" + cardLoc(toggle, "C", winWidth >= 1276)}
        >
          {toggle.botg ? (
            <BudgetGraphCard
              title="Discover the Power of Investing"
              range={range}
              setRange={setRange}
              size={cardSize(winWidth).card}
              dispatch={onDispatchToggle}
              dispatchInfo={dispatchInfo}
              info={info}
              dispatchType="BOTG"
              portfolioR={portfolio}
              goalTrack={
                budgetSetGraphData(budget, range, portfolio, goal.select)
                  .goalCheck
              }
              budgetCalc={budgetCalc(budget)}
              content={
                <ResponsiveContainer
                  minWidth="100%"
                  minHeight={cardSize(winWidth).graphY}
                  maxHeight={cardSize(winWidth).graphY}
                >
                  {info.botg ? (
                    <div>
                      <p>
                        This graph displays your assets over time based on your
                        budgeted surplus/deficit and your expected investment
                        return.
                      </p>
                      <p>
                        The gray area represents your assets without investing
                        (initial capital and monthly surplus).
                      </p>
                      <p>
                        If you have completed your Risk Assessment, the graph
                        will also calculate your expected gains from investing ,
                        which is displayed as the green area.
                      </p>
                      <p>
                        When a "Saving for Purchase" goal is checked, the goal's
                        amount, deadline, and whether or not the goal can be met
                        will be displayed on this graph.
                      </p>
                      <p>Press ? to go back.</p>
                    </div>
                  ) : budgetCalc(budget) >= 0 ? (
                    <AreaChart
                      height={cardSize(winWidth).graphY}
                      data={
                        budgetSetGraphData(
                          budget,
                          range,
                          portfolio,
                          goal.select
                        ).data
                      }
                      margin={{ top: 15, right: 40, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3" vertical={false} />
                      <XAxis
                        stroke="#e7e7e7"
                        dataKey="name"
                        tickFormatter={t => {
                          if (parseInt(t.split(" ")[0]) === range) {
                            return `${t.split(" ")[1]} ${t.split(" ")[2]}`;
                          }
                          return ``;
                        }}
                        tickLine={false}
                      />
                      <YAxis
                        stroke="#e7e7e7"
                        tickFormatter={t => {
                          return formatNumbers(t);
                        }}
                        domain={[
                          setDisplayForBOTG(budget, goal.select).yMin,
                          setDisplayForBOTG(budget, goal.select).yMax
                        ]}
                      />
                      <Tooltip
                        cursor={{ fill: "transparent" }}
                        // content={({ label, payload }) => {
                        //   return (
                        //     <div className="BOTGtooltip">
                        //       <div className="BOTGtooltipTitle">
                        //         {label
                        //           ? `${label.split(" ")[1]} ${
                        //               label.split(" ")[2]
                        //             }`
                        //           : null}
                        //       </div>
                        //       <div>
                        //         Asset w/o Investing :{" "}
                        //         {payload[0]
                        //           ? formatNumbers(payload[0].value)
                        //           : null}
                        //       </div>
                        //       {payload[1] ? (
                        //         <>
                        //           <div>
                        //             Asset from Investing :{" "}
                        //             {formatNumbers(payload[1].value)}
                        //           </div>
                        //           <div>
                        //             Total Asset :{" "}
                        //             {formatNumbers(
                        //               payload[0].value + payload[1].value
                        //             )}
                        //           </div>
                        //         </>
                        //       ) : null}
                        //     </div>
                        //   );
                        // }}
                        contentStyle={{ backgroundColor: "#272727" }}
                      />

                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="Assets without Investing"
                        stackId="1"
                        stroke="#f0f0f0"
                        fill="#f0f0f0"
                      />
                      <Area
                        type="monotone"
                        dataKey="Additional Assets with Investing"
                        stackId="1"
                        stroke="#b8f69c"
                        fill="#b8f69c"
                      />
                      {BOTGreferenceLinesY}
                      {BOTGreferenceLinesX}
                    </AreaChart>
                  ) : (
                    <div>You can't invest with negative cashflow!</div>
                  )}
                </ResponsiveContainer>
              }
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Budget;
