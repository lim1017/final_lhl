import React from "react";

const containerStyles = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "10px"
};

const cardStyles = {
  width: "550px",
  border: "1px solid #b3898e",
  borderRadius: "5px",
  position: "relative",
  background: "white",
  opacity: "0.9"
};

function CardWrapper(props) {
  return (
    <div style={containerStyles}>
      <div style={cardStyles}>
        <span style={{ zIndex: "1" }}>{props.children}</span>
      </div>
    </div>
  );
}

export default CardWrapper;
