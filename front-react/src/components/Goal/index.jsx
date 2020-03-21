import React from "react";
import useVisualMode from "../../hooks/useVisualMode";

import Show from "./show";
import Form from "./form";
import New from "./new";

const SHOW = "SHOW";
const EDIT = "EDIT";
const NEW = "NEW";

export default function Goal(props) {
  const { mode, transition, back } = useVisualMode(!props.mode ? SHOW : NEW);

  function saveGoal(name, type, amount, description, date) {
    const goal = {
      name,
      user_id: 1,
      type,
      amount,
      description,
      date
    };

    // transition(SAVE, true);

    props
      .setGoal(props.id, goal)
      .then(response => {
        console.log("success ", response);
        transition(SHOW);
      })
      .catch(error => {
        // transition(ERROR, true);
        console.log("failure ", error);
      });
  }

  function deleteGoal() {
    props
      .deleteGoal(props.id)
      .then(response => {
        console.log("success ", response);
        transition(SHOW);
      })
      .catch(error => {
        // transition(ERROR, true);
        console.log("failure ", error);
      });
  }

  if (mode === SHOW) {
    return (
      <Show
        name={props.name}
        type={props.type}
        amount={props.amount}
        description={props.description}
        date={props.date}
        onEdit={() => transition(EDIT)}
        onDelete={deleteGoal}
      />
    );
  } else if (mode === EDIT) {
    return (
      <Form
        name={props.name}
        type={props.type}
        amount={props.amount}
        description={props.description}
        date={props.date}
        onCancel={() => back()}
        onSave={saveGoal}
      />
    );
  } else if (mode === NEW) {
    return (
      <New
        name={props.name}
        type={props.type}
        amount={props.amount}
        description={props.description}
        date={props.date}
        onEdit={() => transition(EDIT)}
      />
    );
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
