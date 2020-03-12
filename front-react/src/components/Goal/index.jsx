import React, { Component } from "react";
import useVisualMode from "../../hooks/useVisualMode";

import Show from "./show"
import Form from "./form"


const SHOW = "SHOW";
const EDIT = "EDIT";

export default function Goal({name, type, description, date}) {
  const { mode, transition, back } = useVisualMode(SHOW);

  if (mode === SHOW) {
    return (
      <Show
        name={name}
        type={type}
        description={description}
        date={date}
        onEdit={() => transition(EDIT)}
      />
    )
  } else if (mode === EDIT) {
    return (
      <Form
        name={name}
        type={type}
        description={description}
        date={date}
        onCancel={() => back()}
      />
    )
  }
  // return (
  //   <article className="goal">
  //     <div className="header">
  //       <h4 className="title">{title}</h4>
  //       <div className="icons">
  //         <i className="icon pe-7s-pen" />
  //         <i className="icon pe-7s-trash" />
  //       </div>
  //       <div className="typeDate">
  //         <div>Type of Goal: {typeDetailer(type)}</div>
  //         <div>Date: {date}</div>
  //       </div>
  //     </div>
  //     <div className="description">
  //       <div>{description}</div>
  //     </div>
  //   </article>
  //   // <div className={"card" + (props.plain ? " card-plain" : "")}>
  //   //   <div className={"header" + (props.hCenter ? " text-center" : "")}>
  //   //     <h4 className="title">{props.title}</h4>
  //   //     <p className="category">{props.category}</p>
  //   //   </div>
  //   //   <div
  //   //     className={
  //   //       "content" +
  //   //       (props.ctAllIcons ? " all-icons" : "") +
  //   //       (props.ctTableFullWidth ? " table-full-width" : "") +
  //   //       (props.ctTableResponsive ? " table-responsive" : "") +
  //   //       (props.ctTableUpgrade ? " table-upgrade" : "")
  //   //     }
  //   //   >
  //   //     {this.props.content}

  //   //     <div className="footer">
  //   //       {props.legend}
  //   //       {props.stats != null ? <hr /> : ""}
  //   //       <div className="stats">
  //   //         <i className={props.statsIcon} /> {props.stats}
  //   //       </div>
  //   //     </div>
  //   //   </div>
  //   // </div>
  // );
}
