import React from "react";

export default function QuizQuestion(props) {
  const { question, a1, a2, a3, a4, sendAnswer, id } = props;

  function prepareAnswer(answerz) {
    sendAnswer(answerz, id);
  }

  return (
    <div>
      <ol className="risk-assessment-questions" start="1" tabIndex="0">
        <li>
          <h4>{question}</h4>
          <ul>
            <li>
              <label>
                <input
                  className="risk-assessment-input"
                  name="q1"
                  type="radio"
                  value="1"
                  onChange={e => {
                    prepareAnswer(e.target.value);
                  }}
                ></input>
                {a1}
              </label>
            </li>
            <li>
              <label>
                <input
                  className="risk-assessment-input"
                  name="q1"
                  type="radio"
                  value="2"
                  onChange={e => {
                    prepareAnswer(e.target.value);
                  }}
                ></input>
                {a2}
              </label>
            </li>
            <li>
              <label>
                <input
                  className="risk-assessment-input"
                  name="q1"
                  type="radio"
                  value="3"
                  onChange={e => {
                    prepareAnswer(e.target.value);
                  }}
                ></input>
                {a3}
              </label>
            </li>
            <li>
              <label>
                <input
                  className="risk-assessment-input"
                  name="q1"
                  type="radio"
                  value="4"
                  onChange={e => {
                    prepareAnswer(e.target.value);
                  }}
                ></input>
                {a4}
              </label>
            </li>
          </ul>
        </li>
      </ol>
    </div>
  );
}
