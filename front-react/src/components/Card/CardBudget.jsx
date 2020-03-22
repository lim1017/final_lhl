import React from "react";

export const Card = function(props) {

    return (
      <div
        className={"cardBudget" +
        (props.plain ? " cardBudget-plain" : "") +
        (props.size ? ` cardBudgetSize${props.size}` : "")}
      >
        <div className={"header" + (props.hCenter ? " text-center" : "")}>
          <h4 className="title">{props.title}</h4>
          <p className="category">{props.category}</p>
        </div>
        <div
          className={"content"}
        >
          {props.content}

          <div className="footer">
            {props.legend}
            {props.stats != null ? <hr /> : ""}
            <div className="stats">
              <i className={props.statsIcon} /> {props.stats}
            </div>
          </div>
        </div>
      </div>
    );
}

export default Card;
