import React, { Component, useEffect } from "react";
import {
  Grid,
  Row,
  Col,
  Table,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import ChartistGraph from "react-chartist";
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
  legendBar
} from "variables/Variables.jsx";

import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import useAppData from "../hooks/useAppData";

function portfolioDistribution(riskScore) {
  // score will be from 5 - 20 for now

  let investmentTypes = [
    { type: "Stocks", sum: 0 },
    { type: "Bonds", sum: 0 },
    { type: "Cash", sum: 0 }
  ];

  //conservative portfolio
  if (riskScore > 5 && riskScore < 10) {
    investmentTypes = [
      { type: "Stocks", sum: 20 },
      { type: "Bonds", sum: 60 },
      { type: "Cash", sum: 20 }
    ];
  }
  // medimum portfolio
  else if (riskScore >= 10 && riskScore < 15) {
    investmentTypes = [
      { type: "Stocks", sum: 50 },
      { type: "Bonds", sum: 40 },
      { type: "Cash", sum: 10 }
    ];
  }
  // aggressive portfolio
  else {
    investmentTypes = [
      { type: "Stocks", sum: 75 },
      { type: "Bonds", sum: 20 },
      { type: "Cash", sum: 5 }
    ];
  }
  return investmentTypes;
}

function Portfolio(props) {
  const { state } = useAppData();

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

  return (
    <div>
      <div>
        <Card
          statsIcon="fa fa-clock-o"
          title="Portfolio Distribution"
          content={
            <div id="chartPreferences" className="ct-chart ct-perfect-fourth">
              <ChartistGraph
                data={createPie(portfolioDistribution(6))}
                type="Pie"
              />
            </div>
          }
          legend={
            <div className="legend">
              {createLegend({
                names: nameList(portfolioDistribution()),
                types: ["info", "danger", "warning", "success"]
              })}
            </div>
          }
        />
        <Card />
      </div>
      {/* QUESTIONNAIRE PLACEHOLDER */}
      <div class="risk-assessment-questionnaire">
        <h1>Risk Assessment Questionnaire</h1>
        {/* QUESTION ONE */}
        <ol class="risk-assessment-questions" start="1" tabindex="0">
          <li>
            <h4>How would you best describe your personality?</h4>
            <ul>
              <li>
                <label>
                  <input
                    class="risk-assessment-input"
                    name="q1"
                    type="radio"
                    value="4"
                  ></input>
                  I like to take risks whenever possible if I can get rewarded
                </label>
              </li>
              <li>
                <label>
                  <input
                    class="risk-assessment-input"
                    name="q1"
                    type="radio"
                    value="3"
                  ></input>
                  I like to take risks, but only if they’re logical and
                  calculated
                </label>
              </li>
              <li>
                <label>
                  <input
                    class="risk-assessment-input"
                    name="q1"
                    type="radio"
                    value="2"
                  ></input>
                  I like to play it by the book but am occasionally open to
                  risks
                </label>
              </li>
              <li>
                <label>
                  <input
                    class="risk-assessment-input"
                    name="q1"
                    type="radio"
                    value="1"
                    data-target="I like to play it safe and conservative"
                  ></input>
                  I like to play it safe and conservative
                </label>
              </li>
            </ul>
          </li>
        </ol>
        {/* QUESTION TWO */}
        <ol class="risk-assessment-questions" start="2" tabindex="0">
          <li>
            <h4>Hypothetically, how would you invest $10,000?</h4>
            <ul>
              <li>
                <label>
                  <input
                    class="risk-assessment-input"
                    name="q2"
                    type="radio"
                    value="1"
                  ></input>
                  A guaranteed return of $500 without risking anything
                </label>
              </li>
              <li>
                <label>
                  <input
                    class="risk-assessment-input"
                    name="q2"
                    type="radio"
                    value="2"
                  ></input>
                  The potential of earning $1,000 but the risk of losing $750
                </label>
              </li>
              <li>
                <label>
                  <input
                    class="risk-assessment-input"
                    name="q2"
                    type="radio"
                    value="3"
                  ></input>
                  The potential of earning $1,500 but the risk of losing $1,000
                </label>
              </li>
              <li>
                <label>
                  <input
                    class="risk-assessment-input"
                    name="q2"
                    type="radio"
                    value="4"
                  ></input>
                  The potential of earning $2,500 but the risk of losing $1,750
                </label>
              </li>
            </ul>
          </li>
        </ol>
        {/* QUESTION THREE */}
        <ol class="risk-assessment-questions" start="3" tabindex="0">
          <li>
            <h4>
              How comfortable are you with fluctuations in the value of your
              investments?
            </h4>
            <ul>
              <li>
                <label>
                  <input
                    class="risk-assessment-input"
                    name="q3"
                    type="radio"
                    value="1"
                  ></input>
                  I’d be very anxious if my investments fluctuated
                </label>
              </li>
              <li>
                <label>
                  <input
                    class="risk-assessment-input"
                    name="q3"
                    type="radio"
                    value="2"
                  ></input>
                  I would accept a lower, more predictable rate of return as
                  long as my fluctuations in the value of my investments are
                  small
                </label>
              </li>
              <li>
                <label>
                  <input
                    class="risk-assessment-input"
                    name="q3"
                    type="radio"
                    value="3"
                  ></input>
                  I would accept a higher, slightly less predictable rate of
                  return with some fluctuations in the value of my investments
                </label>
              </li>
              <li>
                <label>
                  <input
                    class="risk-assessment-input"
                    name="q3"
                    type="radio"
                    value="4"
                  ></input>
                  I do not care if my investments fluctuate and want the highest
                  return possible
                </label>
              </li>
            </ul>
          </li>
        </ol>
        {/* QUESTION FOUR */}
        <ol class="risk-assessment-questions" start="4" tabindex="0">
          <li>
            <h4>
              How likely is it that you’ll need access to a large portion of
              this money earlier than expected?
            </h4>
            <ul>
              <li>
                <label>
                  <input
                    class="risk-assessment-input"
                    name="q4"
                    type="radio"
                    value="1"
                  ></input>
                  Very Likely
                </label>
              </li>
              <li>
                <label>
                  <input
                    class="risk-assessment-input"
                    name="q4"
                    type="radio"
                    value="2"
                  ></input>
                  Somewhat Likely
                </label>
              </li>
              <li>
                <label>
                  <input
                    class="risk-assessment-input"
                    name="q4"
                    type="radio"
                    value="3"
                  ></input>
                  Unlikely
                </label>
              </li>
              <li>
                <label>
                  <input
                    class="risk-assessment-input"
                    name="q4"
                    type="radio"
                    value="4"
                  ></input>
                  I won't need to access any of the money
                </label>
              </li>
            </ul>
          </li>
        </ol>
        {/* QUESTION FIVE */}
        <ol class="risk-assessment-questions" start="5" tabindex="0">
          <li>
            <h4>
              Coronavirus hits - your investments drop by 20% - how do you
              react?
            </h4>
            <ul>
              <li>
                <label>
                  <input
                    class="risk-assessment-input"
                    name="q5"
                    type="radio"
                    value="1"
                  ></input>
                  I lose my shit, stock up on mint milano cookies and cash out
                  my investment immediately
                </label>
              </li>
              <li>
                <label>
                  <input
                    class="risk-assessment-input"
                    name="q5"
                    type="radio"
                    value="2"
                  ></input>
                  I would make no changes but re-evaluate when the market
                  recovers
                </label>
              </li>
              <li>
                <label>
                  <input
                    class="risk-assessment-input"
                    name="q5"
                    type="radio"
                    value="3"
                  ></input>
                  I do nothing
                </label>
              </li>
              <li>
                <label>
                  <input
                    class="risk-assessment-input"
                    name="q5"
                    type="radio"
                    value="4"
                  ></input>
                  Coronavirus is fake news - I'd invest more
                </label>
              </li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  );
}
export default Portfolio;
