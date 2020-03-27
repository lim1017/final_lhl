import React from "react";

export const ButtonTypeA= function(props) {

  return (
    <div>
      <div 
        className={"ButtonTypeA"}
        onClick={() => {
          props.onClick
        }}
      >{props.text}</div>
    </div>
  )
}

export default ButtonTypeA;
