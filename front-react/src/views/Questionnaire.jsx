import React, { useState } from "react";

import CardWrapper from "components/Card/CardWrapper.jsx";
import MUButton from "@material-ui/core/Button";

function Questionnaire(props) {
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

  return (
    <div className="risk-assessment-questionnaire-container">
      <div className="questionnaire-background-image">
        <h1 className="risk-assessment-title">Risk Assessment Questionnaire</h1>
        {/* QUESTION ONE */}
        <CardWrapper>
          <ol className="risk-assessment-questions" start="1" tabIndex="0">
            <li>
              <h4>How would you best describe your personality?</h4>
              <ul style={{ listStyleType: "none" }}>
                <li>
                  <label>
                    <input
                      className="risk-assessment-input"
                      name="q1"
                      type="radio"
                      value="4"
                      onChange={e =>
                        props.setQuestionData.setQuestionOne(e.target.value)
                      }
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
                      onChange={e =>
                        props.setQuestionData.setQuestionOne(e.target.value)
                      }
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
                      onChange={e =>
                        props.setQuestionData.setQuestionOne(e.target.value)
                      }
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
                      onChange={e =>
                        props.setQuestionData.setQuestionOne(e.target.value)
                      }
                    ></input>
                    I like to play it safe and conservative
                  </label>
                </li>
              </ul>
            </li>
          </ol>
        </CardWrapper>
        {/* QUESTION TWO */}
        <CardWrapper>
          <ol className="risk-assessment-questions" start="2" tabIndex="0">
            <li>
              <h4>Hypothetically, how would you invest $10,000?</h4>
              <ul style={{ listStyleType: "none" }}>
                <li>
                  <label>
                    <input
                      className="risk-assessment-input"
                      name="q2"
                      type="radio"
                      value="1"
                      onChange={e =>
                        props.setQuestionData.setQuestionTwo(e.target.value)
                      }
                    ></input>
                    A guaranteed smaller return without risking anything
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      className="risk-assessment-input"
                      name="q2"
                      type="radio"
                      value="2"
                      onChange={e =>
                        props.setQuestionData.setQuestionTwo(e.target.value)
                      }
                    ></input>
                    The potential of earning moderate returns with the risk of
                    losing some of your initial investment
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      className="risk-assessment-input"
                      name="q2"
                      type="radio"
                      value="3"
                      onChange={e =>
                        props.setQuestionData.setQuestionTwo(e.target.value)
                      }
                    ></input>
                    The potential of earning strong returns with the risk of
                    losing a large amount of your initial investment
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      className="risk-assessment-input"
                      name="q2"
                      type="radio"
                      value="4"
                      onChange={e =>
                        props.setQuestionData.setQuestionTwo(e.target.value)
                      }
                    ></input>
                    The potential of earning maximum returns with the risk of
                    losing up to half of your initial investment
                  </label>
                </li>
              </ul>
            </li>
          </ol>
        </CardWrapper>
        {/* QUESTION THREE */}
        <CardWrapper>
          <ol className="risk-assessment-questions" start="3" tabIndex="0">
            <li>
              <h4>
                How comfortable are you with fluctuations in the value of your
                investments?
              </h4>
              <ul style={{ listStyleType: "none" }}>
                <li>
                  <label>
                    <input
                      className="risk-assessment-input"
                      name="q3"
                      type="radio"
                      value="1"
                      onChange={e =>
                        props.setQuestionData.setQuestionThree(e.target.value)
                      }
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
                      onChange={e =>
                        props.setQuestionData.setQuestionThree(e.target.value)
                      }
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
                      onChange={e =>
                        props.setQuestionData.setQuestionThree(e.target.value)
                      }
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
                      onChange={e =>
                        props.setQuestionData.setQuestionThree(e.target.value)
                      }
                    ></input>
                    I do not care if my investments fluctuate and want the
                    highest return possible
                  </label>
                </li>
              </ul>
            </li>
          </ol>
        </CardWrapper>
        {/* QUESTION FOUR */}
        <CardWrapper>
          <ol className="risk-assessment-questions" start="4" tabIndex="0">
            <li>
              <h4>
                Will you need access to a large portion of this money earlier
                than expected?
              </h4>
              <ul style={{ listStyleType: "none" }}>
                <li>
                  <label>
                    <input
                      className="risk-assessment-input"
                      name="q4"
                      type="radio"
                      value="1"
                      onChange={e =>
                        props.setQuestionData.setQuestionFour(e.target.value)
                      }
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
                      onChange={e =>
                        props.setQuestionData.setQuestionFour(e.target.value)
                      }
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
                      onChange={e =>
                        props.setQuestionData.setQuestionFour(e.target.value)
                      }
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
                      onChange={e =>
                        props.setQuestionData.setQuestionFour(e.target.value)
                      }
                    ></input>
                    I won't need to access any of the money
                  </label>
                </li>
              </ul>
            </li>
          </ol>
        </CardWrapper>
        {/* QUESTION FIVE */}
        <CardWrapper>
          <ol className="risk-assessment-questions" start="5" tabIndex="0">
            <li>
              <h4>
                Coronavirus!!
                <br /> Your investments drop by 25% - how do you react?
              </h4>
              <ul style={{ listStyleType: "none" }}>
                <li>
                  <label>
                    <input
                      className="risk-assessment-input"
                      name="q5"
                      type="radio"
                      value="1"
                      onChange={e =>
                        props.setQuestionData.setQuestionFive(e.target.value)
                      }
                    ></input>
                    I panic, stock up on mint milano cookies and cash out my
                    investment immediately
                  </label>
                </li>
                <li>
                  <label>
                    <input
                      className="risk-assessment-input"
                      name="q5"
                      type="radio"
                      value="2"
                      onChange={e =>
                        props.setQuestionData.setQuestionFive(e.target.value)
                      }
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
                      onChange={e =>
                        props.setQuestionData.setQuestionFive(e.target.value)
                      }
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
                      onChange={e =>
                        props.setQuestionData.setQuestionFive(e.target.value)
                      }
                    ></input>
                    Coronavirus is fake news - I'd invest more
                  </label>
                </li>
              </ul>
            </li>
          </ol>
        </CardWrapper>
        {/* SUBMIT QUESTIONNAIRE */}
        <div className="risk-assessment-submission">
          <MUButton
            style={{
              ...style,
              background: button1.color,
              height: 70 - button1.x,
              width: 550 - button1.x,
              marginBottom: "1em"
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
            className="risk-assessment-submit-button"
            onClick={e => props.onSubmit(e)}
          >
            Submit and view my investment portfolio
          </MUButton>
        </div>
      </div>
    </div>
  );
}

export default Questionnaire;
