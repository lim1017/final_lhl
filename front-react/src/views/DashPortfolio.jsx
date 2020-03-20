import React from "react";
import { Link } from "react-router-dom";

function DashPortfolio(props) {
  return (
    <div className="dashboard-container">
      <Link to={`/admin/portfolio/start`}>
        <button className="risk-assessment-start-button">
          Start Risk Assessment
        </button>
      </Link>
    </div>
  );
}

export default DashPortfolio;
