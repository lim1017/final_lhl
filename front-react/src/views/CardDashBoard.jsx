import React from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import BriefPortfolio from "./BriefPortfolio";
import DashPortfolio from "./DashPortfolio";
import DashGoals from "./DashGoals";
import DashBudget from "./DashBudget";
import DashExpenses from "./DashExpenses";


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


function CardDashBoard(props) {
  
  const COLORS = ['#c4d2c7', '#ffe7ea', '#f87f8d', '#FF8042'];


  console.log("props", props);
  console.log(props.state.expenses.length)
  return (
    <>
      <Grid item xs={6}>
        <Card
          style={{
            maxWidth: 500,
            minHeight: 500,
            opacity: 0.8,
            margin: "auto",
            marginBottom: 20,
            marginTop: 20,
            padding: 20,
            backgroundColor: "white"
          }}
        >
          <DashGoals></DashGoals>
        </Card>

        <Card
          style={{
            maxWidth: 500,
            minHeight: 500,
            opacity: 0.8,
            margin: "auto",
            marginBottom: 20,
            marginTop: 20,
            padding: 20,
            backgroundColor: "white"
          }}
        >
          <DashBudget></DashBudget>
        </Card>
      </Grid>

      <Grid item xs={6}>
        <Card
          style={{
            maxWidth: 500,
            minHeight: 500,
            opacity: 0.8,
            margin: "auto",
            marginBottom: 20,
            marginTop: 20,
            padding: 20,
            backgroundColor: "white"
          }}
        >

          {props.state.expenses.length === 0 ? (
            <DashExpenses state={props.state}>
            </DashExpenses>  
            ) : 
            <div>
              <h2>Expenses for {returnMonthText(props.state.date.month)}</h2>
            <PieChart width={500} height={350}>
                    <Tooltip />
                    <Pie
                      data={createPie(props.state.totalExpenses)}
                      dataKey="value"
                      nameKey="name"
                      cx="60%"
                      cy="50%"
                      outerRadius={120}
                      fill="#8884d8"
                      label
                    >
                      {createPie(props.state.totalExpenses).map((entry, index) => (
                        <Cell fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend
                      verticalAlign="bottom"
                      layout="horizontal"
                      height={55}
                      width={355}
                    />
            </PieChart>
            </div>
            }
          

        </Card>
        <Card
          style={{
            maxWidth: 500,
            minHeight: 500,
            opacity: 0.8,
            margin: "auto",
            marginBottom: 20,
            marginTop: 20,
            padding: 20,
            backgroundColor: "white"
          }}
        >
          {props.state.users[0].riskscore === 0 ? (
            <DashPortfolio></DashPortfolio>
          ) : (
            <BriefPortfolio state={props.state}></BriefPortfolio>
          )}
        </Card>
      </Grid>
    </>
  );
}

export default CardDashBoard;
