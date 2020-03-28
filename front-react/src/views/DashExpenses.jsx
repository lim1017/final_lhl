import React, { useState } from "react";
import { Link } from "react-router-dom";
import MUButton from "@material-ui/core/Button";

function DashExpenses(props) {
  const [button1, setButton1] = useState({
    color: "linear-gradient(45deg, #ec407a 30%, #f48fb1 90%)",
    x: 0
  });

  const style = {
    background: "linear-gradient(45deg, #ec407a 30%, #f48fb1 90%)",
    borderRadius: 15,
    border: 0,
    color: "white",
    fontSize: 20
  };

  return (
    <div className="dashboard-container">
      <Link to={`/admin/expenses`}>
        <MUButton
          style={{
            ...style,
            background: button1.color,
            height: 70 - button1.x,
            width: 260 - button1.x,
            margin: button1.x / 2
          }}
          onMouseLeave={() =>
            setButton1({
              ...button1,
              color: "linear-gradient(45deg, #ec407a 30%, #f48fb1 90%)",
              x: 0
            })
          }
          onMouseOver={() =>
            setButton1({
              ...button1,
              color: "linear-gradient(45deg, #f06292 30%, #f8bbd0 90%)"
            })
          }
          onMouseUp={() =>
            setButton1({
              ...button1,
              x: 0
            })
          }
          onMouseDown={() =>
            setButton1({
              ...button1,
              x: 5
            })
          }
        >
          Start Expenses
        </MUButton>
      </Link>
    </div>
  );
}

export default DashExpenses;
