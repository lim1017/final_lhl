import React from "react";
import { Link } from "react-router-dom";

function DashBudget(props) {
  return (
    <div className="dashboard-container">
      <Link to={`/admin/budget`}>
        <button className="risk-assessment-start-button">Start Budget</button>
      </Link>
    </div>
  );
}

export default DashBudget;
