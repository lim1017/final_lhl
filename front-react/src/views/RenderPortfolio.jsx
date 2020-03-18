import React from "react";
import Grid from "@material-ui/core/Grid";
import { Link, useRouteMatch } from "react-router-dom";

import ChartistGraph from "react-chartist";
import { Card } from "components/Card/Card";
import CardExplained from "components/Card/CardExplained";

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

function nameList(data) {
  const finalOP = [];
  data.forEach(element => {
    finalOP.push(element.type);
  });
  return finalOP;
}

function RenderPortfolio(props) {
  let match = useRouteMatch();

  return (
    <>
      {/* RENDER PORTFOLIO DISTRIBUTION */}
      <>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Card
              title="Portfolio Distribution"
              content={
                <div
                  id="chartPreferences"
                  className="ct-chart ct-perfect-fourth"
                >
                  {`Your expected return is ${
                    props.portfolioDistribution(props.riskScore).portfolioReturn
                  }`}
                  <ChartistGraph
                    data={createPie(
                      props.portfolioDistribution(props.riskScore)
                        .investmentTypes
                    )}
                    type="Pie"
                  />
                </div>
              }
              legend={
                <div className="legend">
                  {createLegend({
                    names: nameList(
                      props.portfolioDistribution().investmentTypes
                    ),
                    types: ["info", "primary", "success"]
                  })}
                </div>
              }
            />
          </Grid>
          <Grid item xs={6}>
            <Card
              title="Portfolio Distribution"
              content={
                <div
                  id="chartPreferences"
                  className="ct-chart ct-perfect-fourth"
                >
                  {`Your expected return is ${
                    props.portfolioDistribution(props.riskScore).portfolioReturn
                  }`}
                  <ChartistGraph
                    data={createPie(
                      props.portfolioDistribution(props.riskScore)
                        .investmentTypes
                    )}
                    type="Pie"
                  />
                </div>
              }
              legend={
                <div className="legend">
                  {createLegend({
                    names: nameList(
                      props.portfolioDistribution().investmentTypes
                    ),
                    types: ["info", "primary", "success"]
                  })}
                </div>
              }
            ></Card>
          </Grid>
        </Grid>
      </>
      {/* EQUITY INFORMATION RENDERED ONCE QUESTIONNAIRE COMPLETE */}
      <div>
        <h2>Types of Assets: </h2>
        <div className="stocks-bonds-cash-explained">
          <Grid container spacing={1}>
            <CardExplained></CardExplained>

            <Link to={`/admin/portfolio/start`}>
              <button
                rel="Submit"
                href="#"
                className="risk-assessment-start-button"
              >
                Re-Do Risk Assessment
              </button>
            </Link>
          </Grid>
        </div>
      </div>
    </>
  );
}

export default RenderPortfolio;
