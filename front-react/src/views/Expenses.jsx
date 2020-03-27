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
  Tooltip,
  LabelList,
  ResponsiveContainer
} from "recharts";

import Card from "@material-ui/core/Card";
import CardExpTable from "components/Card/CardExpTable.jsx";
import FileUpload from "components/FileUpload/FileUpload.jsx";
import MonthPicker from "components/MonthPicker/MonthPicker.jsx";
import ExpenseUpdater1 from "components/ExpenseUpdater/ExpenseUpdater1.jsx";
import appDataContext from "../hooks/reducers/useContext";
import { MDBDataTable } from "mdbreact";
import Button from "@material-ui/core/Button";
import axios from "axios";
import reducerz, { SET_DATA, SET_DATE, SET_USER } from "../hooks/reducers/app";

function Dashboard(props) {
  const { state, dispatch } = useContext(appDataContext);
  const [addExpense, setAddExpense] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [user, setUser] = useState(false);

  const COLORS = [
    "#ffe7ea",
    "#fffbcf",
    "#dbf0ff",
    "#D0FFDE",
    "#e5dbff",
    "#FAEEC5",
    "#defafa",
    "#dffbd4"
  ];

  useEffect(() => {
    console.log(state);
    setUser(localStorage.getItem("id"));
    refreshExpenses(state.date);
  }, []);

  function doDispatch(date, data) {
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
          totalExpenses: response[1].data,
          users: data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  function handleFile(event) {
    setFileUploaded({
      selectedFile: event.target.files[0],
      loaded: 0
    });
  }

  function sendFileBack() {
    const userId = localStorage.getItem("id");

    var scoreUp = false;
    console.log(state.expenses.length, "expense length");

    if (state.expenses.length === 0) {
      scoreUp = true;
    }

    if (fileUploaded && fileUploaded.selectedFile.name.includes(".csv")) {
      console.log(fileUploaded);
      const data = new FormData();
      data.append("file", fileUploaded);

      const reader = new FileReader();

      reader.onloadend = e => {
        const textData = e.target.result;
        axios
          .post("http://localhost:8001/api/expenses/file/", {
            textData,
            userId,
            date: state.date,
            scoreUp
          })
          .then(res => {
            axios
              .get(`http://localhost:8001/api/users/${userId}`)
              .then(resz => {
                console.log(resz, "after file upload");
                console.log(resz.data[0]);
                dispatch({
                  type: SET_USER,
                  users: resz.data
                });

                doDispatch(state.date, resz.data);
              });
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
          totalExpenses: response[1].data,
          users: state.users
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
              category={returnMonthText(parseInt(state.date.month))}
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
                    maxHeight="170px"
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
                        backgroundColor: "#272727",
                        color: "#e7e7e7",
                        fontWeight: "bold",
                        height: "50px",
                        marginLeft: "3em"
                      }}
                      onClick={() => toggleState()}
                    >
                      Add an expense
                    </Button>

                    <FileUpload
                      handleFile={handleFile}
                      sendFileBack={sendFileBack}
                    />
                  </div>
                  <div className="add-1expense-div">
                    {addExpense ? (
                      <ExpenseUpdater1
                        doDispatch={doDispatch}
                        state={state}
                        date={state.date}
                        onExpenseSubmit={refreshExpenses}
                      />
                    ) : null}
                  </div>
                </div>
              }
            />
          </div>
          {/* <div className='both-expense-tables'> */}
          <div className="expenses-table2">
            {state.expenses.length !== 0 ? (
              <Card
                style={{
                  backgroundColor: "#272727",
                  color: "#e7e7e7",
                  opacity: 0.95
                }}
              >
                <h4 style={{ textAlign: "center" }}>
                  Expense Breakdown By Type (in $)
                </h4>
                <ResponsiveContainer width="90%" height={350}>
                  <PieChart width={400} height={350}>
                    <Tooltip />
                    <Pie
                      data={createPie(state.totalExpenses)}
                      dataKey="value"
                      nameKey="name"
                      cx="55%"
                      cy="50%"
                      outerRadius={110}
                      fill="#8884d8"
                      label
                    >
                      {createPie(state.totalExpenses).map((entry, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Legend verticalAlign="bottom" height={45} width={350} />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            ) : null}
          </div>
          <div className="expenses-table3">
            {state.expenses.length !== 0 ? (
              <Card
                style={{
                  backgroundColor: "#272727",
                  color: "#e7e7e7",
                  opacity: 0.95
                }}
              >
                <h4 style={{ textAlign: "center" }}>
                  Personal Expense Comparison To{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1110022201"
                  >
                    National Average
                  </a>
                </h4>
                <ResponsiveContainer width="95%" height={350}>
                  <BarChart
                    // width={800}
                    // height={350}
                    data={formatDataForBarChart(state.totalExpenses)}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={6} />
                    <Bar dataKey="Personal" fill="#c4d2c7" />
                    <Bar dataKey="Average" fill="#ffe7ea" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            ) : null}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
