import React from "react";

export default function New(props) {
  return (
    <article className="goalNew goalCard">
      <div className="icons">
        <div className="goal-text" onClick={props.onEdit}>
          Click to Create a Goal
        </div>
      </div>
    </article>
  );
}
