import React from "react";
import { Link } from "react-router-dom";

function DashBudget(props) {
  return (
    <div className="dashboard-container">
      <div className="dashboard-container-button">
        <Link to={`/admin/budget`}>
          <button className="risk-assessment-start-button">Start Budget</button>
        </Link>
      </div>
    </div>
  );
}

export default DashBudget;
