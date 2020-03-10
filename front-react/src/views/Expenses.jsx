/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col, Table } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar,
} from "variables/Variables.jsx";

import cx from "classnames";
import { reduceEachLeadingCommentRange } from "typescript";
import useAppData from "../hooks/useAppData";
import { expensesTitle, tdArray } from "variables/Variables.jsx";
import { MDBDataTable } from 'mdbreact';

const axios = require("axios").default;



function Dashboard (props) {
  const{
    state
  } = useAppData();

  console.log("a", state.expenses[0].name)
  // useEffect(() => {
  //   Promise.all([
  //     axios.get("http://localhost:8001/api/expenses")
  //   ]).then(all => {
  //     const [expenses] = all;
  //     console.log(expenses.data)   
  //   });
  // }, []);

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
  

  const testing = ({
    backgroundColor: 'yellow',
    display:'flex',
    justifyContent:'space-between'
    
  });

  // let tableClass = cx({
  //   position: relative;
  //   height: 200px;
  //   overflow: auto;
  //   display: block;
  // })
   
    return (
      <div className="content">
        <p>dashboard</p>
                      
          <Grid fluid>
            <Row>
              <Col md={12}>
                <Card
                  title="Striped Table with Hover"
                  category="Here is a subtitle for this table"
                  ctTableFullWidth
                  ctTableResponsive
                  content={
                    // <div className="my-custom-scrollbar table-wrapper-scroll-y">
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
                              label: 'Name',
                              field: 'name',
                              sort: 'asc',
                              width: 150
                            },
                            {
                              label: 'Type',
                              field: 'type',
                              sort: 'asc',
                              width: 150
                            },
                            {
                              label: 'Amount',
                              field: 'amount',
                              sort: 'asc',
                              width: 150
                            },
                            {
                              label: 'Date',
                              field: 'date',
                              sort: 'asc',
                              width: 150
                            }
                          ],
                          rows: state.expenses
                        }}
                      />
                    </div>
                    // <Table scrollY striped hover>
                    //   <thead>
                    //     <tr>
                    //       {expensesTitle.map((prop, key) => {
                    //         return <th key={key}>{prop}</th>;
                    //       })}
                    //     </tr>
                    //   </thead>
                    //   <tbody>
                    //     {state.expenses.map((prop, key) => {
                    //       return (
                    //         <tr key={key}>
                    //           <td>{prop.name}</td>
                    //           <td>{prop.type}</td>
                    //           <td>{prop.amount}</td>
                    //           <td>{prop.date}</td>
                    //         </tr>
                    //       );
                    //     })}
                    //   </tbody>
                    // </Table>
                    // </div>
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col lg={5}>           
                <Card
                  statsIcon="fa fa-clock-o"
                  title="Email Statistics"
                  category="Last Campaign Performance"
                  stats="Campaign sent 2 days ago"
                  content={
                    <div
                      id="chartPreferences"
                      className="ct-chart ct-perfect-fourth"
                    >
                      <ChartistGraph data={{
                                          labels: ["25%", "10%", "5%", "25", "10", "10", "10"],
                                          series: [10, 20, 20, 20, 10, 10, 10]
                                          }} type="Pie" />
                    </div>
                  }
                  legend={
                    <div className="legend">{createLegend({
                      names: [state.expenses[0].name, "Bounce", "Unsubscribe", "werid gray"],
                      types: ["info", "danger", "warning", "success"]
                    })}</div>
                  }
                />
                <Card />
              </Col>
              <Col lg={7}>
                <Card
                  statsIcon="fa fa-clock-o"
                  title="Email Statistics"
                  category="Last Campaign Performance"
                  stats="Campaign sent 2 days ago"
                  content={
                    <div
                      id="chartPreferences"
                      className="ct-chart ct-perfect-fourth"
                    >
                      <ChartistGraph
                      data={{
                        labels: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                        series: [
                          [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
                          [412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636, 695]
                        ]
                      }}
                      type="Bar"
                      options={optionsBar}
                      responsiveOptions={responsiveBar}
                    />
                    </div>
                  }
                  legend={
                    <div className="legend">{createLegend({
                      names: [state.expenses[0].name, "Bounce", "Unsubscribe", "werid gray"],
                      types: ["info", "danger", "warning", "success"]
                    })}</div>
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col lg={4} sm={6}><Card title="asdas" content="aaaaa" hCenter="true"/></Col>
              <Col lg={4} sm={6}><Card title="asdas" content="bbbbb" hCenter="true"/></Col>
              <Col lg={4} sm={6}><Card title="asdas" content="ccccc" hCenter="true"/></Col>
            </Row>
          </Grid>
        <StatsCard />
      </div>
    );
  
}

export default Dashboard
