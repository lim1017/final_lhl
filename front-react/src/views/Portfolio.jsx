import React, { Component, useEffect, useState } from "react";
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
  if (riskScore >= 5 && riskScore < 10) {
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
  const [state, setState] = useState({
    riskScore: 0,
    questionOne: 0,
    questionTwo: 0,
    questionThree: 0,
    questionFour: 0,
    questionFive: 0
  });

  function setQuestionOne(riskValue) {
    setState({ ...state, questionOne: riskValue });
  }

  function setQuestionTwo(riskValue) {
    setState({ ...state, questionTwo: riskValue });
  }
  function setQuestionThree(riskValue) {
    setState({ ...state, questionThree: riskValue });
  }

  function setQuestionFour(riskValue) {
    setState({ ...state, questionFour: riskValue });
  }

  function setQuestionFive(riskValue) {
    setState({ ...state, questionFive: riskValue });
  }

  function onSubmit(e) {
    const totalScore =
      parseInt(state.questionOne) +
      parseInt(state.questionTwo) +
      parseInt(state.questionThree) +
      parseInt(state.questionFour) +
      parseInt(state.questionFive);
    console.log("RISK SCORE", totalScore);
    e.preventDefault();
    setState({ ...state, riskScore: totalScore });
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
      {/* QUESTIONNAIRE PLACEHOLDER */}
      <div className="risk-assessment-questionnaire">
        <h1>Risk Assessment Questionnaire</h1>
        {/* QUESTION ONE */}
        <ol className="risk-assessment-questions" start="1" tabIndex="0">
          <li>
            <h4>How would you best describe your personality?</h4>
            <ul>
              <li>
                <label>
                  <input
                    className="risk-assessment-input"
                    name="q1"
                    type="radio"
                    value="4"
                    onChange={e => setQuestionOne(e.target.value)}
                  ></input>
                  I like to take risks whenever possible if I can get rewarded
                </label>
              </li>
              <li>
                <label>
                  <input
                    className="risk-assessment-input"
                    name="q1"
                    type="radio"
                    value="3"
                    onChange={e => setQuestionOne(e.target.value)}
                  ></input>
                  I like to take risks, but only if they’re logical and
                  calculated
                </label>
              </li>
              <li>
                <label>
                  <input
                    className="risk-assessment-input"
                    name="q1"
                    type="radio"
                    value="2"
                    onChange={e => setQuestionOne(e.target.value)}
                  ></input>
                  I like to play it by the book but am occasionally open to
                  risks
                </label>
              </li>
              <li>
                <label>
                  <input
                    className="risk-assessment-input"
                    name="q1"
                    type="radio"
                    value="1"
                    onChange={e => setQuestionOne(e.target.value)}
                  ></input>
                  I like to play it safe and conservative
                </label>
              </li>
            </ul>
          </li>
        </ol>
        {/* QUESTION TWO */}
        <ol className="risk-assessment-questions" start="2" tabIndex="0">
          <li>
            <h4>Hypothetically, how would you invest $10,000?</h4>
            <ul>
              <li>
                <label>
                  <input
                    className="risk-assessment-input"
                    name="q2"
                    type="radio"
                    value="1"
                    onChange={e => setQuestionTwo(e.target.value)}
                  ></input>
                  A guaranteed return of $500 without risking anything
                </label>
              </li>
              <li>
                <label>
                  <input
                    className="risk-assessment-input"
                    name="q2"
                    type="radio"
                    value="2"
                    onChange={e => setQuestionTwo(e.target.value)}
                  ></input>
                  The potential of earning $1,000 but the risk of losing $750
                </label>
              </li>
              <li>
                <label>
                  <input
                    className="risk-assessment-input"
                    name="q2"
                    type="radio"
                    value="3"
                    onChange={e => setQuestionTwo(e.target.value)}
                  ></input>
                  The potential of earning $1,500 but the risk of losing $1,000
                </label>
              </li>
              <li>
                <label>
                  <input
                    className="risk-assessment-input"
                    name="q2"
                    type="radio"
                    value="4"
                    onChange={e => setQuestionTwo(e.target.value)}
                  ></input>
                  The potential of earning $2,500 but the risk of losing $1,750
                </label>
              </li>
            </ul>
          </li>
        </ol>
        {/* QUESTION THREE */}
        <ol className="risk-assessment-questions" start="3" tabIndex="0">
          <li>
            <h4>
              How comfortable are you with fluctuations in the value of your
              investments?
            </h4>
            <ul>
              <li>
                <label>
                  <input
                    className="risk-assessment-input"
                    name="q3"
                    type="radio"
                    value="1"
                    onChange={e => setQuestionThree(e.target.value)}
                  ></input>
                  I’d be very anxious if my investments fluctuated
                </label>
              </li>
              <li>
                <label>
                  <input
                    className="risk-assessment-input"
                    name="q3"
                    type="radio"
                    value="2"
                    onChange={e => setQuestionThree(e.target.value)}
                  ></input>
                  I would accept a lower, more predictable rate of return as
                  long as my fluctuations in the value of my investments are
                  small
                </label>
              </li>
              <li>
                <label>
                  <input
                    className="risk-assessment-input"
                    name="q3"
                    type="radio"
                    value="3"
                    onChange={e => setQuestionThree(e.target.value)}
                  ></input>
                  I would accept a higher, slightly less predictable rate of
                  return with some fluctuations in the value of my investments
                </label>
              </li>
              <li>
                <label>
                  <input
                    className="risk-assessment-input"
                    name="q3"
                    type="radio"
                    value="4"
                    onChange={e => setQuestionThree(e.target.value)}
                  ></input>
                  I do not care if my investments fluctuate and want the highest
                  return possible
                </label>
              </li>
            </ul>
          </li>
        </ol>
        {/* QUESTION FOUR */}
        <ol className="risk-assessment-questions" start="4" tabIndex="0">
          <li>
            <h4>
              How likely is it that you’ll need access to a large portion of
              this money earlier than expected?
            </h4>
            <ul>
              <li>
                <label>
                  <input
                    className="risk-assessment-input"
                    name="q4"
                    type="radio"
                    value="1"
                    onChange={e => setQuestionFour(e.target.value)}
                  ></input>
                  Very Likely
                </label>
              </li>
              <li>
                <label>
                  <input
                    className="risk-assessment-input"
                    name="q4"
                    type="radio"
                    value="2"
                    onChange={e => setQuestionFour(e.target.value)}
                  ></input>
                  Somewhat Likely
                </label>
              </li>
              <li>
                <label>
                  <input
                    className="risk-assessment-input"
                    name="q4"
                    type="radio"
                    value="3"
                    onChange={e => setQuestionFour(e.target.value)}
                  ></input>
                  Unlikely
                </label>
              </li>
              <li>
                <label>
                  <input
                    className="risk-assessment-input"
                    name="q4"
                    type="radio"
                    value="4"
                    onChange={e => setQuestionFour(e.target.value)}
                  ></input>
                  I won't need to access any of the money
                </label>
              </li>
            </ul>
          </li>
        </ol>
        {/* QUESTION FIVE */}
        <ol className="risk-assessment-questions" start="5" tabIndex="0">
          <li>
            <h4>
              Coronavirus hits - your investments drop by 20% - how do you
              react?
            </h4>
            <ul>
              <li>
                <label>
                  <input
                    className="risk-assessment-input"
                    name="q5"
                    type="radio"
                    value="1"
                    onChange={e => setQuestionFive(e.target.value)}
                  ></input>
                  I lose my shit, stock up on mint milano cookies and cash out
                  my investment immediately
                </label>
              </li>
              <li>
                <label>
                  <input
                    className="risk-assessment-input"
                    name="q5"
                    type="radio"
                    value="2"
                    onChange={e => setQuestionFive(e.target.value)}
                  ></input>
                  I would make no changes but re-evaluate when the market
                  recovers
                </label>
              </li>
              <li>
                <label>
                  <input
                    className="risk-assessment-input"
                    name="q5"
                    type="radio"
                    value="3"
                    onChange={e => setQuestionFive(e.target.value)}
                  ></input>
                  I do nothing
                </label>
              </li>
              <li>
                <label>
                  <input
                    className="risk-assessment-input"
                    name="q5"
                    type="radio"
                    value="4"
                    onChange={e => setQuestionFive(e.target.value)}
                  ></input>
                  Coronavirus is fake news - I'd invest more
                </label>
              </li>
            </ul>
          </li>
        </ol>
      </div>

      {/* SUBMIT QUESTIONNAIRE */}
      <div className="risk-assessment-submission">
        <h4>Submit and view my investment profile</h4>
        <a
          rel="Submit"
          href="#"
          className="risk-assessment-submit-button"
          onClick={e => onSubmit(e)}
        >
          Submit
        </a>
      </div>

      {/* RENDER PORTFOLIO DISTRIBUTION */}
      <Card
        title="Portfolio Distribution"
        content={
          <div id="chartPreferences" className="ct-chart ct-perfect-fourth">
            <ChartistGraph
              data={createPie(portfolioDistribution(state.riskScore))}
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
  );
}
export default Portfolio;
