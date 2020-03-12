import React, { Component } from "react";

export default function New(props) {
  // function typeDetailer(type) {
  //   switch (type) {
  //     case "SFP":
  //       return "saving for purchase"
  //     default:
  //       return type
  //   }
  // }

  return (
    <article className="goalNew">
      <div className="icons">
        <i 
          className="icon pe-7s-pen"
          onClick={props.onEdit}
        />    
      </div>
    </article>
  );
}