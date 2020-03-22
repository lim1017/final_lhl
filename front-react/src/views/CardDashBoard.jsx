import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import BriefPortfolio from "./BriefPortfolio";
import DashPortfolio from "./DashPortfolio";
import DashGoals from "./DashGoals";
import DashBudget from "./DashBudget";
import DashExpenses from "./DashExpenses";
import NewUserPg from "components/NewUserPg/NewUserPg.jsx";
import axios from "axios";



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

  const [isUserNew, setIsUserNew] = useState(true);
  const userId = localStorage.getItem('id');


  
  useEffect(() => {
  
    Promise.all([
      axios.get(`http://localhost:8001/api/users/${userId}`)
    ])
      .then(response => {
        console.log(response, 'from dashboard')
        console.log(response[0].data[0].isnew)
        setIsUserNew(response[0].data[0].isnew)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);



  function oldUser(){
    console.log(isUserNew)

  Promise.all([
      axios.put(`http://localhost:8001/api/users/update/newuser`, {userId})
    ])
      .then(response => {
        console.log("axios data recieved: ", response);
        setIsUserNew(false)

      })
      .catch(error => {
        console.log("no go");
      });

  }

  
  const COLORS = ['#c4d2c7', '#ffe7ea', '#f87f8d', '#FF8042'];

  return (
    
     

    <>
      {isUserNew ? (
          <NewUserPg oldUser={oldUser} />    
      ) :
      <>
      {/* <Grid item xs={9}> */}
      <div className='dash-card1'>
        <Card
          style={{
            width:'500px',
            maxWidth: 500,
            minHeight: 500,
            opacity: 0.9,
            margin: "auto",
            marginBottom: 20,
            marginTop: 20,
            padding: 20,
            backgroundColor: "white",
            display:'grid',
            gridTemplateRows: '1fr 1fr 1fr'
          }}
        >
          <DashGoals ></DashGoals>
          <h1 className='card1-txt'>Step1: Secure your financial future; Setup your first goal!</h1>
        </Card>
      </div>

      <div className='dash-card2'>
        <Card
          style={{
            width:'500px',
            maxWidth: 500,
            minHeight: 500,
            opacity: 0.9,
            margin: "auto",
            marginBottom: 20,
            marginTop: 20,
            padding: 20,
            backgroundColor: "white",
            display:'grid',
            gridTemplateRows: '1fr 1fr 1fr'
          }}
        >
          <DashBudget></DashBudget>
          <h1 className='card1-txt'>Step3: See the power of planning your budget</h1>
        </Card>
      </div>
      {/* </Grid> */}

       {/* <Grid item xs={9}> */}
      <div className='dash-card3'>
        <Card
          style={{
            width:'500px',
            width:'500px',
            maxWidth: 500,
            minHeight: 500,
            opacity: 0.9,
            margin: "auto",
            marginBottom: 20,
            marginTop: 20,
            padding: 20,
            backgroundColor: "white",
            display:'grid',
            gridTemplateRows: '1fr 1fr 1fr'          }}
        >

          {props.state.expenses.length === 0 ? (
            <>
            <DashExpenses state={props.state}>
            </DashExpenses>
             <h1 className='card1-txt'>Step2: See whats really slowing you down.  Track your expenses!</h1>  
            </>
            ) : 
            <div className='dashboard-chart'>
              <h4>Expenses for {returnMonthText(props.state.date.month)}</h4>
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
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
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
        </div>
        <div className='dash-card4'>
        <Card
          style={{
            width:'500px',
            maxWidth: 500,
            minHeight: 500,
            opacity: 0.9,
            margin: "auto",
            marginBottom: 20,
            marginTop: 20,
            padding: 20,
            backgroundColor: "white",
            display:'grid',
            gridTemplateRows: '1fr 1fr 1fr'
          }}
        >
          {props.state.users[0].riskscore === 0 ? (
            <>
            <DashPortfolio></DashPortfolio>
             <h1 className='card1-txt'>Step4: Let us help you Invest!</h1>
            </>  
          ) : (
            <BriefPortfolio state={props.state}></BriefPortfolio>
          )}
        </Card>
        </div>
      {/* </Grid> */}


    </>
  }

    </>
  );
}

export default CardDashBoard;
