import React from "react";

const containerStyles = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "10px"
};

const cardStyles = {
  width: "550px",
  border: "3px solid #b3898e",
  borderRadius: "1.5rem",
  borderColor: "#e7e7e7",
  position: "relative",
  background: "#272727",
  color: "#e7e7e7",
  opacity: "0.95"
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
