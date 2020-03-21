import React from "react";
import { Link } from "react-router-dom";

function DashGoals(props) {
  return (
    <div className="dashboard-container">
      <Link to={`/admin/goals`}>
        <button className="risk-assessment-start-button">Start Goals</button>
      </Link>
    </div>
  );
}

export default DashGoals;
