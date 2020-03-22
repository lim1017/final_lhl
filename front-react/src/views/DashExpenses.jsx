import React from "react";
import { Link } from "react-router-dom";






function DashExpenses(props) {
  return (
    <div className="dashboard-container">
      <Link to={`/admin/expenses`}>
        <button className="risk-assessment-start-button">Start Expenses</button>
      </Link>
    </div>
  );
}

export default DashExpenses;
