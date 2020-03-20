import React, { useContext } from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";

function DashPortfolio(props) {
  return (
    <div className="dashboard-portfolio-container">
      <Link to={`/admin/portfolio/start`}>
        <button className="risk-assessment-start-button">
          Start Risk Assessment
        </button>
      </Link>
    </div>
  );
}

export default DashPortfolio;
