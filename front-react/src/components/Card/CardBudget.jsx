import React from "react";
// import iconQuestion from "../../assets/img/question_inverted";

export const Card = function(props) {

    return (
      <div
        className={"cardBudget" +
        (props.plain ? " cardBudget-plain" : "") +
        (props.size ? ` cardBudgetSize${props.size}` : "")}
      >
        <div className={"header" + (props.hCenter ? " text-center" : "")}>
          <h4 className="title">{props.title}</h4>
            <div className="iconQuestion">
              <img src="../../assets/img/new_logo.png" alt="question" height="20" width="20" />
            </div>
          <p className="category">{props.category}</p>
        </div>
        <div className={"content"}>
          {props.content}
        </div>

        <div className="footer">
          {props.legend}
          {props.stats != null ? <hr /> : ""}
          <div className="stats">
            <i className={props.statsIcon} /> {props.stats}
          </div>
        </div>
      </div>
    );
}

export default Card;
