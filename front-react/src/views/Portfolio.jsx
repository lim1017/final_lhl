import React, { useState, useContext } from "react";
import appDataContext from "../hooks/reducers/useContext";
import ChartistGraph from "react-chartist";
import { Card } from "components/Card/Card.jsx";
import axios from "axios";
import { SET_DATA } from "hooks/reducers/app";

function portfolioDistribution(riskScore) {
  let portfolioReturn = 1;
  // score will be from 5 - 20 for now
  let investmentTypes = [
    { type: "Stocks", sum: 0 },
    { type: "Bonds", sum: 0 },
    { type: "Cash", sum: 100 }
  ];

  //conservative portfolio
  if (riskScore >= 5 && riskScore < 10) {
    investmentTypes = [
      { type: "Stocks", sum: 20 },
      { type: "Bonds", sum: 60 },
      { type: "Cash", sum: 20 }
    ];
    portfolioReturn = 1.05;
  }
  // medimum portfolio
  else if (riskScore >= 10 && riskScore < 15) {
    investmentTypes = [
      { type: "Stocks", sum: 50 },
      { type: "Bonds", sum: 40 },
      { type: "Cash", sum: 10 }
    ];
    portfolioReturn = 1.07;
  }
  // aggressive portfolio
  else if (riskScore >= 15) {
    investmentTypes = [
      { type: "Stocks", sum: 75 },
      { type: "Bonds", sum: 20 },
      { type: "Cash", sum: 5 }
    ];
    portfolioReturn = 1.09;
  }
  return { investmentTypes, portfolioReturn };
}

// SETS localState OF THE PORTFOLIO BASED ON ANSWERS
function Portfolio(props) {
  const { state, dispatch } = useContext(appDataContext);
  const [localState, setLocalState] = useState({
    riskScore: 0,
    questionOne: 0,
    questionTwo: 0,
    questionThree: 0,
    questionFour: 0,
    questionFive: 0,
    portfolioReturn: 1,
    showGraph: false,
    showQuestionnaire: false,
    showInformation: false
  });

  function setQuestionOne(riskValue) {
    setLocalState({ ...localState, questionOne: riskValue });
  }
  function setQuestionTwo(riskValue) {
    setLocalState({ ...localState, questionTwo: riskValue });
  }
  function setQuestionThree(riskValue) {
    setLocalState({ ...localState, questionThree: riskValue });
  }
  function setQuestionFour(riskValue) {
    setLocalState({ ...localState, questionFour: riskValue });
  }
  function setQuestionFive(riskValue) {
    setLocalState({ ...localState, questionFive: riskValue });
  }

  function onSubmit(e) {
    const totalScore =
      parseInt(localState.questionOne) +
      parseInt(localState.questionTwo) +
      parseInt(localState.questionThree) +
      parseInt(localState.questionFour) +
      parseInt(localState.questionFive);

    const userPortfolio = {
      user: 1,
      riskScore: totalScore,
      portfolioReturn: portfolioDistribution(totalScore).portfolioReturn
    };

    e.preventDefault();
    setLocalState({
      ...localState,
      riskScore: totalScore,
      portfolioReturn: portfolioDistribution(totalScore).portfolioReturn,
      showGraph: true,
      showQuestionnaire: false,
      showInformation: true
    });
    Promise.all([
      axios.put(`http://localhost:8001/api/users/add`, userPortfolio)
    ]).then(() => {
      dispatch({
        ...state,
        user: userPortfolio,
        type: SET_DATA
      });
    });
  }

  function start(e) {
    setLocalState({
      ...localState,
      showQuestionnaire: true,
      showGraph: false,
      showInformation: false
    });
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

  const portfolioReturnData = {
    labels: ["Now", "1 Year", "2 Years", "5 Years", "10 Years"],
    series: [
      [1, 1, 1, 1, 1],
      [3, 3, 3, 3, 3],
      [6, 10, 8, 16, 20]
    ]
  };
  const biPolarLineChartOptions = {
    width: 1000,
    high: 20,
    low: 0,
    showArea: true,
    showLine: false,
    showPoint: false,
    axisX: {
      showLabel: false,
      showGrid: false
    }
  };

  return (
    <div>
      <a
        rel="Submit"
        href="#"
        className="risk-assessment-start-button"
        onClick={e => start(e)}
      >
        Start Risk Assessment
      </a>
      {/* QUESTIONNAIRE PLACEHOLDER */}
      {localState.showQuestionnaire ? (
        <div>
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
                      I like to take risks whenever possible if I can get
                      rewarded
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
                      The potential of earning $1,000 but the risk of losing
                      $750
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
                      The potential of earning $1,500 but the risk of losing
                      $1,000
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
                      The potential of earning $2,500 but the risk of losing
                      $1,750
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
                      return with some fluctuations in the value of my
                      investments
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
                      I do not care if my investments fluctuate and want the
                      highest return possible
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
                      I lose my shit, stock up on mint milano cookies and cash
                      out my investment immediately
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
            <a
              rel="Submit"
              href="#"
              className="risk-assessment-submit-button"
              onClick={e => onSubmit(e)}
            >
              Submit and view my investment portfolio
            </a>
          </div>
        </div>
      ) : null}

      {/* RENDER PORTFOLIO DISTRIBUTION */}
      {localState.showGraph ? (
        <Card
          title="Portfolio Distribution"
          content={
            <div id="chartPreferences" className="ct-chart ct-perfect-fourth">
              {`Your expected return is ${
                portfolioDistribution(localState.riskScore).portfolioReturn
              }`}
              <ChartistGraph
                data={createPie(
                  portfolioDistribution(localState.riskScore).investmentTypes
                )}
                type="Pie"
              />
            </div>
          }
          legend={
            <div className="legend">
              {createLegend({
                names: nameList(portfolioDistribution().investmentTypes),
                types: ["info", "primary", "success"]
              })}
            </div>
          }
        />
      ) : null}
      {/* EQUITY INFORMATION RENDERED ONCE QUESTIONNAIRE COMPLETE */}
      {localState.showInformation ? (
        <div>
          <ChartistGraph
            data={portfolioReturnData}
            options={biPolarLineChartOptions}
            type={"Line"}
          />
          <p>
            CASH: CASH RULES EVERYTHING AROUND ME CREAM. DOLLA DOLLA BILLS YALL
          </p>
          <p>BONDS: VODKA MARTINI, SHAKEN NOT STIRRED</p>
          <p>STOCKS: GROWTH GROWTH GROWTH FUCK YES</p>
        </div>
      ) : null}
    </div>
  );
}
export default Portfolio;
