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
import { Grid, Row, Col } from "react-bootstrap";
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

const axios = require("axios").default;



function Dashboard (props) {
let expenses;
  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/expenses")
    ]).then(all => {
      const [expenses] = all;
      console.log(expenses.data)   
    });
  }, []);

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

    


   
    return (
      
      <div className="content">
       <p>dashboard</p>
       
       <div style={testing} >
      
       <Card title="2014" content="bobobobbbbbbbbbbbbbbbo" hCenter="true"/>
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
                    names: ["Open", "Bounce", "Unsubscribe", "werid gray"],
                    types: ["info", "danger", "warning", "success"]
                  })}</div>
                }
              />
       <Card />
       </div > 

      <StatsCard />

      </div>
    );
  
}

export default Dashboard
