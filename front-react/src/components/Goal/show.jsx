import React, { useState } from "react";

export default function Show(props) {
  const [click, setClick] = useState(false);

  function typeDetailer(type) {
    switch (type) {
      case "SFP":
        return "Purchase";
      case "SPM":
        return "Saving Money";
      case "LE":
        return "Limit Expenses";
      default:
        return type;
    }
  }

  return (
    <article
      className={`goal${click ? " goalClick" : ""} goalCard`}
      onClick={() => setClick(!click)}
    >
      <div className="header">
        <h4 className="title">{props.name}</h4>
        <div className="icons">
          <i className="icon pe-7s-pen" onClick={props.onEdit} />
          <i className="icon pe-7s-trash" onClick={props.onDelete} />
        </div>
        <div className="content">
          <div>Goal Type: {typeDetailer(props.type)}</div>
          <div>$: {props.amount}</div>
          <div>
            Date: {`${props.date.split("-")[1]}-${props.date.split("-")[2]}`}
          </div>
        </div>
      </div>
      <div className="description">
        <div>{props.description}</div>
      </div>
    </article>
  );
}
