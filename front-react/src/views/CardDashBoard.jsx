import React from "react";
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
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { createPie, returnMonthText } from "helpers/expenseHelper";

function CardDashBoard(props) {
  const expenseKey = [
    "Entertainment",
    "Medical",
    "Debt",
    "Misc",
    "Transporation",
    "Home",
    "Food",
    "Utilities"
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

  const colors = [
    "#ffe7ea",
    "#fffbcf",
    "#dbf0ff",
    "#D0FFDE",
    "#e5dbff",
    "#FAEEC5",
    "#defafa",
    "#e7e7e7"
  ];
  const formatDataForPVAT = function(state) {
    const Budgeted = { name: "Budgeted" };
    const Actual = { name: "Actual" };
    const result = [];

    for (let i = 0; i < expenseKey.length; i++) {
      Budgeted[`${expenseKey[i]}`] = state.budget[0][`${budgetKey[i]}`];
      if (state.totalExpenses[i]) {
        Actual[`${expenseKey[i]}`] = state.totalExpenses[i].sum;
      }
    }

    result.push(Budgeted);
    result.push(Actual);

    return result;
  };

  const PVATdata = expenseKey.map((value, i) => {
    return <Bar key={i} dataKey={expenseKey[i]} stackId="a" fill={colors[i]} />;
  });

  return (
    <>
      {/* Goals Card */}
      <div className="dash-card1">
        <Card
          style={{
            width: "500px",
            maxWidth: 500,
            minHeight: 500,
            opacity: 0.95,
            margin: "auto",
            marginBottom: 20,
            marginTop: 20,
            padding: 20,
            backgroundColor: "#272727",
            color: "#e7e7e7"
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
              <h4>My Financial Goals:</h4>
              <Goals state={props.state} />
            </div>
          )}
        </Card>
      </div>
      {/* Budget Goals */}
      <div className="dash-card4">
        <Card
          style={{
            width: "500px",
            maxWidth: 500,
            maxHeight: 500,
            opacity: 0.95,
            margin: "auto",
            marginBottom: 20,
            marginTop: 20,
            padding: 20,
            backgroundColor: "#272727",
            color: "#e7e7e7"
          }}
        >
          {props.state.budget.length === 0 ? (
            <>
              <h1 className="card1-txt">
                Step 4:
                <br></br>
                <br></br>
                The best way to stick to a budget is to start one
              </h1>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <DashBudget></DashBudget>
            </>
          ) : (
            <div className="dashboard-chart">
              <h4>
                My Budget for{" "}
                {returnMonthText(parseInt(props.state.date.month))}:
              </h4>
              <BarChart
                width={500}
                height={350}
                data={formatDataForPVAT(props.state)}
                margin={{ top: 15, right: 40, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis stroke="#e7e7e7" dataKey="name" />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: "#272727" }} />
                <Legend />
                {PVATdata}
              </BarChart>
            </div>
          )}
        </Card>
      </div>

      <div className="dash-card2">
        <Card
          style={{
            width: "500px",
            maxWidth: 500,
            maxHeight: 500,
            opacity: 0.95,
            margin: "auto",
            marginBottom: 20,
            marginTop: 20,
            padding: 20,
            backgroundColor: "#272727",
            color: "#e7e7e7"
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
            <ResponsiveContainer width={700} height="80%">
              <div>
                <h4>
                  My Expenses for{" "}
                  {returnMonthText(parseInt(props.state.date.month))}:
                </h4>
                <PieChart width={550} height={350}>
                  <Tooltip
                    itemStyle={{ color: "#e7e7e7" }}
                    contentStyle={{ backgroundColor: "#272727" }}
                  />

                  <Pie
                    data={createPie(props.state.totalExpenses)}
                    dataKey="value"
                    nameKey="name"
                    cx="41%"
                    cy="49%"
                    outerRadius={125}
                    fill="#8884d8"
                    label
                  >
                    {createPie(props.state.totalExpenses).map(
                      (entry, index) => (
                        <Cell
                          key={index}
                          fill={colors[index % colors.length]}
                        />
                      )
                    )}
                  </Pie>
                  <Legend
                    verticalAlign="bottom"
                    layout="horizontal"
                    height={20}
                    width={450}
                    textColor="#e7e7e7"
                  />
                </PieChart>
              </div>
            </ResponsiveContainer>
          )}
        </Card>
      </div>
      {/* Portfolio Card */}
      <div className="dash-card3">
        <Card
          style={{
            width: "500px",
            maxWidth: 500,
            minHeight: 500,
            opacity: 0.95,
            margin: "auto",
            marginBottom: 20,
            marginTop: 20,
            padding: 20,
            backgroundColor: "#272727",
            color: "#e7e7e7"
          }}
        >
          {props.state.users[0].riskscore === 0 ? (
            <>
              <h1 className="card1-txt">
                Step 3:
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
            // <ResponsiveContainer width={700} height="80%">

            <BriefPortfolio state={props.state}></BriefPortfolio>
            // </ResponsiveContainer>
          )}
        </Card>
      </div>
    </>
  );
}

export default CardDashBoard;
