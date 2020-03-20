import React, { useState, useContext, useEffect } from "react";
import { Grid, Row, Col } from "react-bootstrap";
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

import { Card } from "components/Card/Card.jsx";

import { CardExpTable } from "components/Card/CardExpTable.jsx";

import FileUpload from "components/FileUpload/FileUpload.jsx";

import MonthPicker from "components/MonthPicker/MonthPicker.jsx";
import ExpenseUpdater1 from "components/ExpenseUpdater/ExpenseUpdater1.jsx";

import appDataContext from "../hooks/reducers/useContext";
import { MDBDataTable } from "mdbreact";
import Button from "@material-ui/core/Button";
import axios from "axios";
import reducerz, { SET_DATA, SET_DATE } from "../hooks/reducers/app";

function Dashboard(props) {
  const { state, dispatch } = useContext(appDataContext);
  const [addExpense, setAddExpense] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [user, setUser] = useState(false);


  const COLORS = ['#c4d2c7', '#ffe7ea', '#f87f8d', '#FF8042'];
  

  useEffect(() => {
    console.log(state)
     setUser(localStorage.getItem('id'))

  }, []);

  function handleFile(event) {
    setFileUploaded({
      selectedFile: event.target.files[0],
      loaded: 0
    });
  }

  function sendFileBack() {

    const userId = localStorage.getItem('id');


    if (fileUploaded && fileUploaded.selectedFile.name.includes(".csv")) {
      console.log(fileUploaded);
      const data = new FormData();
      data.append("file", fileUploaded);

      const reader = new FileReader();

      reader.onloadend = e => {
        const textData = e.target.result;
        axios
          .post(
            "http://localhost:8001/api/expenses/file/",
            { textData, userId },
            {
              // receive two parameter endpoint url ,form data
            }
          )
          .then(res => {
            // then print response status
            refreshExpenses(state.date);
          });
      };

      reader.readAsText(fileUploaded.selectedFile);

      // console.log("this is file uploaded", fileUploaded)
      // console.log("this is the data from expenses", data)
    } else {
      console.log("upload a csv file");
    }
  }

  function formatDataForExpenseTable(data) {
    const finalOP = [];

    data.forEach(ele => {
      if (ele.amount !== 0) {
        finalOP.push(ele);
      }
    });

    return finalOP;
  }

  function formatDataForBarChart(data) {
    const finalOP = [];
    const avg=[315, 180, 533, 1700, 79, 172, 558, 300]
    let i =0
    data.forEach(ele => {
      
      const bar={
        name:ele.type,
        Personal:ele.sum,
        Average:avg[i]
      }
      finalOP.push(bar);
      i++
    });   
    return finalOP;
  }

  function returnMonthText(number) {
    switch (number) {
      case 1:
        return "January";
      case 2:
        return "Febuary";
      case 3:
        return "March";

      default:
      // code block
    }
  }

  function toggleState() {
    setAddExpense(!addExpense);
  }

  function createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }

  function chgMonth(date) {
    const datez = {
      month: date.month,
      year: date.year
    };

    dispatch({
      type: SET_DATE,
      date: datez
    });


    
    refreshExpenses(date);
  }

  function nameList(data) {
    const finalOP = [];
    data.forEach(element => {
      finalOP.push(element.type);
    });
    return finalOP;
  }

  function createPie(expensesTotal) {
   
    const finalOP=[]
    expensesTotal.forEach(element =>{
      const slice={
        name:element.type,
        value:parseInt(element.sum)
      }
      finalOP.push(slice)
    })
    return finalOP
  }

  function refreshExpenses(date) {
    let datez= `${date.month}+${date.year}+${user}`

    Promise.all([
      axios.get(`http://localhost:8001/api/expenses/${datez}`),
      axios.get(`http://localhost:8001/api/expensestotal/${datez}`)
    ])
      .then(response => {
        dispatch({
          ...state,
          type: SET_DATA,
          expenses: response[0].data,
          totalExpenses: response[1].data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div className="content" style={{ padding: "0" }}>
      <div className="top35px">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <CardExpTable
                title="Expenses"
                category={returnMonthText(state.date.month)}
                ctTableFullWidth
                ctTableResponsive
                content2={
                  <MonthPicker currentMonth={state.date} chgMonth={chgMonth} />
                }
                content={
                  <div>
                    <MDBDataTable
                      searching={false}
                      displayEntries={false}
                      scrollY
                      maxHeight="300px"
                      striped
                      bordered
                      small
                      data={{
                        columns: [
                          {
                            label: "Name",
                            field: "name",
                            sort: "asc",
                            width: 150
                          },
                          {
                            label: "Type",
                            field: "type",
                            sort: "asc",
                            width: 150
                          },
                          {
                            label: "Amount",
                            field: "amount",
                            sort: "asc",
                            width: 150
                          },
                          {
                            label: "Date",
                            field: "date",
                            sort: "asc",
                            width: 150
                          }
                        ],
                        rows: formatDataForExpenseTable(state.expenses)
                      }}
                    />
                    <div className="addExpenseDiv">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => toggleState()}
                      >
                        Add an expense
                      </Button>

                      {addExpense ? (
                        <ExpenseUpdater1
                          onExpenseSubmit={() => refreshExpenses(state.date)}
                        />
                      ) : null}

                      <FileUpload
                        handleFile={handleFile}
                        sendFileBack={sendFileBack}
                      />
                    </div>
                  </div>
                }
              />
            </Col>
          </Row>
          <Row>
            <Col lg={5}>
              <Card
                statsIcon="fa fa-clock-o"
                title="Expenses"
                category={returnMonthText(state.date.month)}
                stats="Campaign sent 2 days ago"
                content={
                  <PieChart width={730} height={350}>
                    <Pie
                      data={createPie(state.totalExpenses)}
                      dataKey="value"
                      nameKey="name"
                      cx="40%"
                      cy="40%"
                      outerRadius={70}
                      fill="#8884d8"
                      label
                    >
                      {createPie(state.totalExpenses).map((entry, index) => (
                        <Cell fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend
                      verticalAlign="bottom"
                      layout="horizontal"
                      height={35}
                      width={355}
                    />
                  </PieChart>
                }
              />
            </Col>
            <Col lg={7}>
              <Card
                statsIcon="fa fa-clock-o"
                title={returnMonthText(state.date.month)}
                category="Expense Comparison To National Average"
                stats="Campaign sent 2 days ago"
                content={
                  <BarChart
                    width={730}
                    height={350}
                    data={formatDataForBarChart(state.totalExpenses)}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Personal" fill="#c4d2c7" />
                    <Bar dataKey="Average" fill="#ffe7ea" />
                  </BarChart>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    </div>
  );
}

export default Dashboard;
