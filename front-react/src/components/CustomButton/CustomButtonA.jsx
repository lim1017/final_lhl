/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { Button } from "react-bootstrap";
// import cx from "classnames";
import PropTypes from "prop-types";

export const CustomButton = function(props) {

    return (
      <div>
        <div 
          className={"budgetPlanToggle" + (props.toggle ? " budgetPlanOn" : "")}
          onClick={() => {
            props.dispatch({ type: props.type})
          }}
        >{props.text}</div>
      </div>
    )

}

export default CustomButton;
