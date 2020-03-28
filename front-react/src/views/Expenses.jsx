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
import axios from "axios";
import reducerz, { SET_DATA, SET_DATE, SET_USER } from "../hooks/reducers/app";
import MUButton from "@material-ui/core/Button";

function Dashboard(props) {
  const { state, dispatch } = useContext(appDataContext);
  const [addExpense, setAddExpense] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [user, setUser] = useState(false);

  const [button1, setButton1] = useState({
    color: "linear-gradient(45deg, #ec407a 30%, #f48fb1 90%)",
    x: 0
  });

  const style = {
    background: "linear-gradient(45deg, #ec407a 30%, #f48fb1 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 40,
    width: 105,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px #4a148c 30%",
    marginLeft: 0
  };

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
    refreshExpenses(state.date);

    const userz = localStorage.getItem("id");
    setUser(userz);
  }, []);

  function doDispatch(date, data) {
    const userz = localStorage.getItem("id");

    let datez = `${date.month}+${date.year}+${userz}`;

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

    if (state.expenses.length === 0) {
      scoreUp = true;
    }

    if (fileUploaded && fileUploaded.selectedFile.name.includes(".csv")) {
      // console.log(fileUploaded);
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
      // console.log("upload a csv file");
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
    const userz = localStorage.getItem("id");

    let datez = `${date.month}+${date.year}+${userz}`;

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
                    <MUButton
                      style={{
                        ...style,
                        background: button1.color,
                        marginRight: "1em",
                        marginLeft: "1em",
                        marginTop: "4px"
                      }}
                      onMouseLeave={() =>
                        setButton1({
                          ...button1,
                          color:
                            "linear-gradient(45deg, #ec407a 30%, #f48fb1 90%)"
                        })
                      }
                      onMouseOver={() =>
                        setButton1({
                          ...button1,
                          color:
                            "linear-gradient(45deg, #f06292 30%, #f8bbd0 90%)"
                        })
                      }
                      onMouseUp={() =>
                        setButton1({
                          ...button1,
                          x: 0
                        })
                      }
                      onMouseDown={() =>
                        setButton1({
                          ...button1,
                          x: 2
                        })
                      }
                      onClick={() => toggleState()}
                    >
                      Add an expense
                    </MUButton>

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
                    <Tooltip
                      itemStyle={{ color: "#e7e7e7" }}
                      contentStyle={{ backgroundColor: "#272727" }}
                    />
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
                    <XAxis
                      stroke="#e7e7e7"
                      dataKey="name"
                      angle={-45}
                      interval={0}
                      height={70}
                      textAnchor="end"
                    />
                    <YAxis stroke="#e7e7e7" />
                    <Tooltip
                      cursor={{ fill: "transparent" }}
                      contentStyle={{ backgroundColor: "#272727" }}
                    />
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
