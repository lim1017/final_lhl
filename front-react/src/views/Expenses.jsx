import React, { useState, useContext } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { CardExpTable } from "components/Card/CardExpTable.jsx";

import MonthPicker from "components/MonthPicker/MonthPicker.jsx";
import ExpenseUpdater1 from "components/ExpenseUpdater/ExpenseUpdater1.jsx";
import { optionsBar, responsiveBar } from "variables/Variables.jsx";

import appDataContext from "../hooks/reducers/useContext";
import { MDBDataTable } from "mdbreact";
import Button from "@material-ui/core/Button";
import axios from "axios";
import reducerz, { SET_DATA, SET_DATE } from "../hooks/reducers/app";

function Dashboard(props) {
  const { state, dispatch } = useContext(appDataContext);
  const [addExpense, setAddExpense] = useState(false);


  function formatDataForBarChart(data) {
    const finalOP = [];
    data.forEach(ele => {
      finalOP.push(ele.sum);
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
    const finalOP = { labels: [], series: [] };
    let grandTotal = 0;
    expensesTotal.forEach(element => {
      grandTotal += parseInt(element.sum);
    });
    expensesTotal.forEach(element => {
      finalOP.labels.push(
        ((parseInt(element.sum) / grandTotal) * 100).toFixed(0) + "%"
      );
      finalOP.series.push(element.sum);
    });

    return finalOP;
  }

  function refreshExpenses(date) {
    let datez = `${date.month}+${date.year}`;

    Promise.all([
      axios.get(`http://localhost:8001/api/expenses/${datez}`),
      axios.get(`http://localhost:8001/api/expensestotal/${datez}`)
    ])
      .then(response => {
        dispatch({
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
    <div className="content">
      <p>dashboard</p>

      <Grid fluid>
        <Row>
          <Col md={12}>
            <CardExpTable
              title="Expenses"
              category={returnMonthText(state.date.month)}
              ctTableFullWidth
              ctTableResponsive
              content2={<MonthPicker currentMonth={state.date} chgMonth={chgMonth} />}
              content={
                <div>
                  <MDBDataTable
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
                      rows: state.expenses
                    }}
                  />
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
                <div
                  id="chartPreferences"
                  className="ct-chart ct-perfect-fourth"
                >
                  <ChartistGraph
                    data={createPie(state.totalExpenses)}
                    type="Pie"
                  />
                </div>
              }
              legend={
                <div className="legend">
                  {createLegend({
                    names: nameList(state.totalExpenses),
                    types: ["info", "danger", "warning", "success"]
                  })}
                </div>
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
                <div
                  id="chartPreferences"
                  className="ct-chart ct-perfect-fourth"
                >
                  <ChartistGraph
                    data={{
                      labels: [
                        "Debt",
                        "Entertainment",
                        "Food",
                        "Home",
                        "Medical",
                        "Misc",
                        "Transporation",
                        "Utilities"
                      ],
                      series: [
                        formatDataForBarChart(state.totalExpenses),
                        [315, 180, 533, 1700, 79, 172, 558, 300]
                      ]
                    }}
                    type="Bar"
                    options={optionsBar}
                    responsiveOptions={responsiveBar}
                  />
                </div>
              }
              legend={
                <div className="legend">
                  {createLegend({
                    names: ["You", "Average"],
                    types: ["info", "danger", "warning", "success"]
                  })}
                </div>
              }
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default Dashboard;
