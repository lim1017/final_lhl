import React from "react";

export default function New(props) {
 
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