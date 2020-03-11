import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

class Portfolio extends Component {
  render() {
    return (
      // QUESTIONNAIRE PLACEHOLDER
      <div class="risk-assessment-questionnaire">
        <h1>Risk Assessment Questionnaire</h1>
        {/* QUESTION ONE */}
        <ol class="risk-assessment-questions" start="1" tabindex="0">
          <li>
            <h4>How would you best describe your personality?</h4>
            <ul>
              <li>
                <label>
                  I like to take risks whenever possible if I can get rewarded
                </label>
                <input
                  class="risk-assessment-input"
                  name="q1"
                  type="radio"
                  value="4"
                ></input>
              </li>
              <li>
                <label>
                  I like to take risks, but only if they’re logical and
                  calculated
                </label>
                <input
                  class="risk-assessment-input"
                  name="q1"
                  type="radio"
                  value="3"
                ></input>
              </li>
              <li>
                <label>
                  I like to play it by the book but am occasionally open to
                  risks
                </label>
                <input
                  class="risk-assessment-input"
                  name="q1"
                  type="radio"
                  value="2"
                ></input>
              </li>
              <li>
                <label>I like to play it safe and conservative</label>
                <input
                  class="risk-assessment-input"
                  name="q1"
                  type="radio"
                  value="1"
                ></input>
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
                  A guaranteed return of $500 without risking anything
                </label>
                <input
                  class="risk-assessment-input"
                  name="q1"
                  type="radio"
                  value="1"
                ></input>
              </li>
              <li>
                <label>
                  The potential of earning $1,000 but the risk of losing $750
                </label>
                <input
                  class="risk-assessment-input"
                  name="q1"
                  type="radio"
                  value="2"
                ></input>
              </li>
              <li>
                <label>
                  The potential of earning $1,500 but the risk of losing $1,000
                </label>
                <input
                  class="risk-assessment-input"
                  name="q1"
                  type="radio"
                  value="3"
                ></input>
              </li>
              <li>
                <label>
                  The potential of earning $2,500 but the risk of losing $1,750
                </label>
                <input
                  class="risk-assessment-input"
                  name="q1"
                  type="radio"
                  value="4"
                ></input>
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
                <label>I’d be very anxious if my investments fluctuated</label>
                <input
                  class="risk-assessment-input"
                  name="q1"
                  type="radio"
                  value="1"
                ></input>
              </li>
              <li>
                <label>
                  I would accept a lower, more predictable rate of return as
                  long as my fluctuations in the value of my investments are
                  small
                </label>
                <input
                  class="risk-assessment-input"
                  name="q1"
                  type="radio"
                  value="2"
                ></input>
              </li>
              <li>
                <label>
                  I would accept a higher, slightly less predictable rate of
                  return with some fluctuations in the value of my investments
                </label>
                <input
                  class="risk-assessment-input"
                  name="q1"
                  type="radio"
                  value="3"
                ></input>
              </li>
              <li>
                <label>
                  I do not care if my investments fluctuate and want the highest
                  return possible
                </label>
                <input
                  class="risk-assessment-input"
                  name="q1"
                  type="radio"
                  value="4"
                ></input>
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
                <label>Very Likely</label>
                <input
                  class="risk-assessment-input"
                  name="q1"
                  type="radio"
                  value="1"
                ></input>
              </li>
              <li>
                <label>Somewhat Likely</label>
                <input
                  class="risk-assessment-input"
                  name="q1"
                  type="radio"
                  value="2"
                ></input>
              </li>
              <li>
                <label>Unlikely</label>
                <input
                  class="risk-assessment-input"
                  name="q1"
                  type="radio"
                  value="3"
                ></input>
              </li>
              <li>
                <label>I won't need to access any of the money </label>
                <input
                  class="risk-assessment-input"
                  name="q1"
                  type="radio"
                  value="4"
                ></input>
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
                  I lose my shit, stock up on mint milano cookies and cash out
                  my investment immediately
                </label>
                <input
                  class="risk-assessment-input"
                  name="q1"
                  type="radio"
                  value="1"
                ></input>
              </li>
              <li>
                <label>
                  I would make no changes but re-evaluate when the market
                  recovers
                </label>
                <input
                  class="risk-assessment-input"
                  name="q1"
                  type="radio"
                  value="2"
                ></input>
              </li>
              <li>
                <label>I do nothing</label>
                <input
                  class="risk-assessment-input"
                  name="q1"
                  type="radio"
                  value="3"
                ></input>
              </li>
              <li>
                <label>Coronavirus is fake news - I'd invest more </label>
                <input
                  class="risk-assessment-input"
                  name="q1"
                  type="radio"
                  value="4"
                ></input>
              </li>
            </ul>
          </li>
        </ol>
      </div>
      <Row>
      <Col lg={5}>           
        <Card
          statsIcon="fa fa-clock-o"
          title="Expenses"
          category="Last Campaign Performance"
          stats="Campaign sent 2 days ago"
          content={
            <div
              id="chartPreferences"
              className="ct-chart ct-perfect-fourth"
            >
              <ChartistGraph data={createPie(state.totalExpenses)} type="Pie" />
            </div>
          }
          legend={
            <div className="legend">{createLegend({
              names: nameList(state.totalExpenses),
              types: ["info", "danger", "warning", "success"]
            })}</div>
          }
        />
        <Card />
      </Col>
      </Row>
    );
  }
}

export default Portfolio;
