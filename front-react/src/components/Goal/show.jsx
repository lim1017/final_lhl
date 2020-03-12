import React, { Component } from "react";

export default function Show(props) {
  function typeDetailer(type) {
    switch (type) {
      case "SFP":
        return "saving for purchase"
      default:
        return type
    }
  }
  
  console.log('ShowGoal props: ', props)

  return (
    <article className="goal">
      <div className="header">
        <h4 className="title">{props.name}</h4>
        <div className="icons">
          <i 
            className="icon pe-7s-pen"
            onClick={props.onEdit}
          />
          <i className="icon pe-7s-trash" />
        </div>
        <div className="content">
          <div>Type of Goal: {typeDetailer(props.type)}</div>
          <div>Date: {props.date}</div>
        </div>
      </div>
      <div className="description">
        <div>{props.description}</div>
      </div>
    </article>
  );
}
