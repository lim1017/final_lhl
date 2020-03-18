import React, { Component } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

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
