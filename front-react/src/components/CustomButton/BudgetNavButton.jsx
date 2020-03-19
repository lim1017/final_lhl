import React from "react";

export const BudgetNavButton = function(props) {

  return (
    <div>
      <div 
        className={"budgetPlanToggle" + (props.toggle ? " budgetPlanOn" : "")}
        onClick={() => {
          props.dispatch({ type: props.type })
        }}
      >{props.text}</div>
    </div>
  )
}

export default BudgetNavButton;
