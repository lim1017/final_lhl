
import React, { useState } from "react";


export const Card = function(props) {
  return (
    <div
      className={
        "cardBudget" +
        (props.plain ? " cardBudget-plain" : "") +
        (props.size ? ` cardBudgetSize${props.size}` : "")
      }
    >
      <div className={"header" + (props.hCenter ? " text-center" : "")}>
        <h4 className="title">{props.title}</h4>
        <div className="budgetIcons">
          <div className="budgetIconsList">
            <div className="iconQuestion">
              <img
                src={require("../../assets/img/budget_question2.png")}
                alt="question"
                height="20"
                width="20"
                onClick={() => {
                  props.dispatchInfo({ type: props.dispatchType });
                }}
              />
            </div>
            <div className="iconQuit">
              <img
                src={require("../../assets/img/budget_quit4.png")}
                alt="quit"
                height="20"
                width="20"
                onClick={() => {
                  props.dispatch({ type: props.dispatchType });
                }}
              />
            </div>
          </div>
        </div>
        <p className="category">{props.category}</p>
      </div>
      <div className={"content"}>{props.content}</div>

      <div className="footer">
        {props.legend}
        {props.stats != null ? <hr /> : ""}
        <div className="stats">
          <i className={props.statsIcon} /> {props.stats}
        </div>
      </div>
    </div>
  );
};

export default Card;
