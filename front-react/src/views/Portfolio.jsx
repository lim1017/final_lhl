import React, { useState, useContext, useEffect } from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import appDataContext from "../hooks/reducers/useContext";
import Questionnaire from "./Questionnaire";
import RenderPortfolio from "./RenderPortfolio";
import axios from "axios";
import { SET_DATA, SET_USER } from "hooks/reducers/app";
import MUButton from "@material-ui/core/Button";

function portfolioDistribution(riskScore) {
  //renders portfolio based on questionnaire response of user
  let portfolioReturn = 1;
  // score will be from 5 - 20
  let investmentTypes = [
    { type: "Emerging Market Index", sum: 0 },
    { type: "S&P/TSX Index", sum: 0 },
    { type: "Low Volatility Index", sum: 0 },
    { type: "Corporate Bonds", sum: 0 },
    { type: "Government Bonds", sum: 0 },
    { type: "Cash", sum: 100 }
  ];
  //conservative portfolio
  if (riskScore < 8) {
    investmentTypes = [
      { type: "Emerging Market Index", sum: 5 },
      { type: "S&P/TSX Index", sum: 10 },
      { type: "Low Volatility Index", sum: 20 },
      { type: "Corporate Bonds", sum: 30 },
      { type: "Government Bonds", sum: 35 }
    ];
    portfolioReturn = 1.05;
  }
  // low risk portfolio
  else if (riskScore >= 8 && riskScore < 11) {
    investmentTypes = [
      { type: "Emerging Market Index", sum: 10 },
      { type: "S&P/TSX Index", sum: 15 },
      { type: "Low Volatility Index", sum: 25 },
      { type: "Corporate Bonds", sum: 25 },
      { type: "Government Bonds", sum: 25 }
    ];
    portfolioReturn = 1.06;
  }
  // medium risk portfolio
  else if (riskScore >= 11 && riskScore < 14) {
    investmentTypes = [
      { type: "Emerging Market Index", sum: 10 },
      { type: "S&P/TSX Index", sum: 25 },
      { type: "Low Volatility Index", sum: 25 },
      { type: "Corporate Bonds", sum: 20 },
      { type: "Government Bonds", sum: 20 }
    ];
    portfolioReturn = 1.07;
  }
  // strong risk portfolio
  else if (riskScore >= 14 && riskScore < 17) {
    investmentTypes = [
      { type: "Emerging Market Index", sum: 15 },
      { type: "S&P/TSX Index", sum: 35 },
      { type: "Low Volatility Index", sum: 20 },
      { type: "Corporate Bonds", sum: 15 },
      { type: "Government Bonds", sum: 15 }
    ];
    portfolioReturn = 1.08;
  }
  // maximum risk portfolio
  else if (riskScore >= 17) {
    investmentTypes = [
      { type: "Emerging Market Index", sum: 20 },
      { type: "S&P/TSX Index", sum: 40 },
      { type: "Low Volatility Index", sum: 25 },
      { type: "Corporate Bonds", sum: 10 },
      { type: "Government Bonds", sum: 5 }
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
    portfolioReturn: 1
  });

  //for the big button
  const [button1, setButton1] = useState({
    color: "linear-gradient(45deg, #ec407a 30%, #f48fb1 90%)",
    x: 0
  });

  const style = {
    background: "linear-gradient(45deg, #ec407a 30%, #f48fb1 90%)",
    borderRadius: 15,
    border: 0,
    color: "white",
    fontSize: 20
  };

  // RENDER CHART IF USER ALREADY SUBMITTED ASSESSMENT

  useEffect(() => {
    if (state.users[0].riskscore >= 1) {
      window.location.href = "/admin/portfolio/review";
    }
  }, []);

  const setQuestionData = {
    setQuestionOne(riskValue) {
      setLocalState({ ...localState, questionOne: riskValue });
    },
    setQuestionTwo(riskValue) {
      setLocalState({ ...localState, questionTwo: riskValue });
    },
    setQuestionThree(riskValue) {
      setLocalState({ ...localState, questionThree: riskValue });
    },
    setQuestionFour(riskValue) {
      setLocalState({ ...localState, questionFour: riskValue });
    },
    setQuestionFive(riskValue) {
      setLocalState({ ...localState, questionFive: riskValue });
    }
  };

  function onSubmit(e) {
    const totalScore =
      parseInt(localState.questionOne) +
      parseInt(localState.questionTwo) +
      parseInt(localState.questionThree) +
      parseInt(localState.questionFour) +
      parseInt(localState.questionFive);

    const userid = localStorage.getItem("id");

    var scoreUp = false;

    if (state.users[0].riskscore === 0) {
      scoreUp = true;
    }

    const userPortfolio = {
      user: userid,
      riskScore: totalScore,
      portfolioReturn: portfolioDistribution(totalScore).portfolioReturn
    };

    e.preventDefault();

    setLocalState({
      ...localState,
      riskScore: totalScore,
      portfolioReturn: portfolioDistribution(totalScore).portfolioReturn
    });

    Promise.all([
      axios.put(`http://localhost:8001/api/users/update`, {
        userPortfolio,
        scoreUp
      })
    ]).then(() => {
      dispatch({
        ...state,
        user: userPortfolio,
        type: SET_DATA
      });

      axios.get(`http://localhost:8001/api/users/${userid}`).then(resz => {
        dispatch({
          type: SET_USER,
          users: resz.data
        });
      });

      // force redirect
      window.location.href = "/admin/portfolio/review";
    });
  }

  let match = useRouteMatch();

  return (
    <div className="risk-assessment-start-div">
      <Switch>
        <Route path={`/admin/portfolio/start`}>
          <div className="risk-assessment-button-image-container">
            <div className="risk-assessment-background-image"></div>
            <Link to={`${match.url}/questionnaire`}>
              <MUButton
                className="risk-assessment-start-button"
                style={{
                  ...style,
                  background: button1.color,
                  height: 70 - button1.x,
                  width: 350 - button1.x,
                  margin: button1.x / 2
                }}
                onMouseLeave={() =>
                  setButton1({
                    ...button1,
                    color: "linear-gradient(45deg, #ec407a 30%, #f48fb1 90%)",
                    x: 0
                  })
                }
                onMouseOver={() =>
                  setButton1({
                    ...button1,
                    color: "linear-gradient(45deg, #f06292 30%, #f8bbd0 90%)"
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
                    x: 5
                  })
                }
              >
                Start Risk Assessment
              </MUButton>
            </Link>
          </div>
        </Route>

        <Route path={`${match.url}/questionnaire`}>
          {/* QUESTIONNAIRE PLACEHOLDER */}
          <Questionnaire
            setQuestionData={setQuestionData}
            onSubmit={onSubmit}
          />
        </Route>
        <Route path={`${match.url}/review`}>
          <RenderPortfolio
            portfolioDistribution={portfolioDistribution}
            state={state}
          />
        </Route>
      </Switch>
    </div>
  );
}
export default Portfolio;
