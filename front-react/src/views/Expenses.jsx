import React, { useState, useContext, useEffect } from "react";

import {
  formatDataForExpenseTable,
  createPie,
  returnMonthText,
  formatDataForBarChart
} from "helpers/expenseHelper";

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

  const COLORS = ["#c4d2c7", "#ffe7ea", "#f87f8d", "#FF8042"];

  useEffect(() => {
    console.log(state);
    setUser(localStorage.getItem("id"));
  }, []);

  function handleFile(event) {
    setFileUploaded({
      selectedFile: event.target.files[0],
      loaded: 0
    });
  }

  function sendFileBack() {
    const userId = localStorage.getItem("id");

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
            { textData, userId, date:state.date },
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

  function toggleState() {
    setAddExpense(!addExpense);
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

  function refreshExpenses(date) {
    let datez = `${date.month}+${date.year}+${user}`;

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
    <div className="content-wrapper">
      <div className="content1" style={{ padding: "0" }}>
        <div className="contentExpenses1">
          <div className="expenses-table1">
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
                    className="mdb"
                    searching={false}
                    displayEntries={false}
                    scrollY
                    maxHeight="225px"
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
                      // color="primary"
                      style={{
                        backgroundColor: "#c4d2c7",
                        color: "black",
                        fontWeight: "bold",
                        height: "50px"
                      }}
                      onClick={() => toggleState()}
                    >
                      Add an expense
                    </Button>

                    {addExpense ? (
                      <ExpenseUpdater1
                        date={state.date}
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
          </div>

          <div className="expenses-table2">

          {state.expenses.length !==0 ? (
                     
                     <Card
                     statsIcon="fa fa-clock-o"
                     title="Expenses"
                     content={
                       <PieChart width={500} height={350}>
                         <Tooltip />
                         <Pie
                           data={createPie(state.totalExpenses)}
                           dataKey="value"
                           nameKey="name"
                           cx="70%"
                           cy="40%"
                           outerRadius={120}
                           fill="#8884d8"
                           label
                         >
                           {createPie(state.totalExpenses).map((entry, index) => (
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
                     }
                   />

          ) : null}


       
          </div>
          <div className="expenses-table3">

          {state.expenses.length !==0 ? (
                     
                     <Card
                     statsIcon="fa fa-clock-o"
                     title={<p>Expense Comparison To <a target="_blank" rel="noopener noreferrer" href="https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1110022201">National Average</a>
                     </p>}
                     content={
                       <BarChart
                         width={500}
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

          ) : null}

          


          
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
