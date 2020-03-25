import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import BriefPortfolio from "./BriefPortfolio";
import DashPortfolio from "./DashPortfolio";
import DashGoals from "./DashGoals";
import DashBudget from "./DashBudget";
import DashExpenses from "./DashExpenses";
import Goals from "components/Dashboard/DashGoalsTable";

import {
  PieChart,
  Pie,
  Legend,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import { createPie, returnMonthText } from "helpers/expenseHelper";

//props is = to state
function CardDashBoard(props) {
  // const [isUserNew, setIsUserNew] = useState(true);
  // const userId = localStorage.getItem('id');

  // useEffect(() => {

  //   Promise.all([
  //     axios.get(`http://localhost:8001/api/users/${userId}`)
  //   ])
  //     .then(response => {
  //       console.log(response, 'from dashboard')
  //       console.log(response[0].data[0].isnew)
  //       setIsUserNew(response[0].data[0].isnew)
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, []);

  // function oldUser(){
  //   console.log(isUserNew)

  // Promise.all([
  //     axios.put(`http://localhost:8001/api/users/update/newuser`, {userId})
  //   ])
  //     .then(response => {
  //       console.log("axios data recieved: ", response);
  //       setIsUserNew(false)

  //     })
  //     .catch(error => {
  //       console.log("no go");
  //     });

  // }

  const expenseKey = [
    "entertainment",
    "medical",
    "debt",
    "misc",
    "transporation",
    "home",
    "food",
    "utilities"
  ];
  const budgetKey = [
    "c_entr",
    "c_medi",
    "c_debt",
    "c_misc",
    "c_tran",
    "c_hous",
    "c_food",
    "c_util"
  ];
  const budgetColors = [
    "#ffe7ea",
    "#c4d2c7",
    "#cce3e1",
    "#add0e0",
    "#b6bffa",
    "#f5c2b3",
    "#dfe6c3",
    "#f5e0b3"
  ];
  const COLORS = [
    "#f6c1fd",
    "#fbe8fd",
    "#ffe7ea",
    "#c5e6ab",
    "#c4d2c7",
    "#d4f3bb"
  ];
  const formatDataForPVAT = function(state) {
    const plan = { name: "plan" };
    const actual = { name: "actual" };
    const result = [];

    for (let i = 0; i < expenseKey.length; i++) {
      plan[`${expenseKey[i]}`] = state.budget[0][`${budgetKey[i]}`];
      if (state.totalExpenses[i]) {
        actual[`${expenseKey[i]}`] = state.totalExpenses[i].sum;
      }
    }

    result.push(plan);
    result.push(actual);

    return result;
  };

  const PVATdata = expenseKey.map((value, i) => {
    return (
      <Bar key={i} dataKey={expenseKey[i]} stackId="a" fill={budgetColors[i]} />
    );
  });

  return (
    <>
      {/* <Grid item xs={9}> */}
      <div className="dash-card1">
        <Card
          style={{
            width: "500px",
            maxWidth: 500,
            minHeight: 500,
            opacity: 1,
            margin: "auto",
            marginBottom: 20,
            marginTop: 20,
            padding: 20,
            backgroundColor: "white"
          }}
        >
          {props.state.goals.length === 0 ? (
            <>
              <h1 className="card1-txt">
                Step 1:
                <br></br>
                <br></br>
                Success is the progressive realization of a worthy goal
              </h1>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <DashGoals></DashGoals>
            </>
          ) : (
            <div className="dashboard-chart1">
              <h4>My Goals</h4>
              <Goals state={props.state} />
            </div>
          )}
        </Card>
      </div>

      <div className="dash-card2">
        <Card
          style={{
            width: "500px",
            maxWidth: 500,
            minHeight: 500,
            opacity: 1,
            margin: "auto",
            marginBottom: 20,
            marginTop: 20,
            padding: 20,
            backgroundColor: "white"
          }}
        >
          {props.state.budget.length === 0 ? (
            <>
              <h1 className="card1-txt">
                Step 3:
                <br></br>
                <br></br>
                The best way to stick to your budget is to start one
              </h1>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <DashBudget></DashBudget>
            </>
          ) : (
            <div className="dashboard-chart">
              <h4>Expenses for {returnMonthText(props.state.date.month)}</h4>
              <BarChart
                width={500}
                height={350}
                data={formatDataForPVAT(props.state)}
                margin={{ top: 15, right: 40, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <Tooltip />
                <Legend />
                {PVATdata}
              </BarChart>
            </div>
          )}
        </Card>
      </div>
      {/* </Grid> */}

      {/* <Grid item xs={9}> */}
      <div className="dash-card3">
        <Card
          style={{
            width: "500px",
            width: "500px",
            maxWidth: 500,
            minHeight: 500,
            opacity: 1,
            margin: "auto",
            marginBottom: 20,
            marginTop: 20,
            padding: 20,
            backgroundColor: "white"
          }}
        >
          {props.state.expenses.length === 0 ? (
            <>
              <h1 className="card1-txt">
                Step 2:
                <br></br>
                <br></br>A penny saved is a penny earned
              </h1>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <DashExpenses state={props.state}></DashExpenses>
            </>
          ) : (
            <div>
              <h4>
                Your expenses for{" "}
                {returnMonthText(parseInt(props.state.date.month))}:
              </h4>
              <PieChart width={730} height={500}>
                {/* <Tooltip /> */}
                <Pie
                  data={createPie(props.state.totalExpenses)}
                  dataKey="value"
                  nameKey="name"
                  cx="33%"
                  cy="40%"
                  outerRadius={140}
                  fill="#8884d8"
                  label
                >
                  {createPie(props.state.totalExpenses).map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend
                  verticalAlign="bottom"
                  layout="horizontal"
                  height={0}
                  width={450}
                />
              </PieChart>
            </div>
          )}
        </Card>
      </div>
      <div className="dash-card4">
        <Card
          style={{
            width: "500px",
            maxWidth: 500,
            minHeight: 500,
            opacity: 1,
            margin: "auto",
            marginBottom: 20,
            marginTop: 20,
            padding: 20,
            backgroundColor: "white"
          }}
        >
          {props.state.users[0].riskscore === 0 ? (
            <>
              <h1 className="card1-txt">
                Step 4:
                <br></br>
                <br></br>
                Discover the power of compound interest
              </h1>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <DashPortfolio></DashPortfolio>
            </>
          ) : (
            <BriefPortfolio state={props.state}></BriefPortfolio>
          )}
        </Card>
      </div>
      {/* </Grid> */}
    </>
  );
}

export default CardDashBoard;
