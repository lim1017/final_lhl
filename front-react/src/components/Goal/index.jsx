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
    const id = localStorage.getItem("id");
    const goal = {
      name,
      user_id: id,
      type,
      amount,
      description,
      date
    };


    props
      .setGoal(props.id, goal)
      .then(response => {
        transition(SHOW);
      })
      .catch(error => {
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
}
