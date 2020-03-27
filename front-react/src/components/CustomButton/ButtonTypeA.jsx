import React from "react";

export const ButtonTypeA= function(props) {

  return (

    <div 
      className="buttonTypeA"
      onClick={() => {props.onClick()}}
    >
      {props.text}
    </div>

  )
}

export default ButtonTypeA;
