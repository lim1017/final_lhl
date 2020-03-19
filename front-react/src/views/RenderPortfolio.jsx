import React from "react";
import Grid from "@material-ui/core/Grid";
import { Link, useRouteMatch } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import CardExplained from "components/Card/CardExplained";
import CardPortfolio from "components/Card/CardPortfolio";

function RenderPortfolio(props) {
  let match = useRouteMatch();

  return (
    <div className="risk-assessment-review-container">
      <div className="review-background-image">
        {/* RENDER PORTFOLIO DISTRIBUTION */}

        {/* EQUITY INFORMATION RENDERED ONCE QUESTIONNAIRE COMPLETE */}
        <div>
          <div className="stocks-bonds-cash-explained">
            <Grid container spacing={1}>
              <CardExplained></CardExplained>
              <Grid item xs={12}>
                <CardPortfolio
                  portfolioDistribution={props.portfolioDistribution}
                  state={props.state}
                ></CardPortfolio>
              </Grid>
            </Grid>
          </div>
        </div>
        <Link to={`/admin/portfolio/start`} c>
          <button
            rel="Submit"
            href="#"
            className="risk-assessment-start-button"
          >
            Re-Do Risk Assessment
          </button>
        </Link>
      </div>
    </div>
  );
}

export default RenderPortfolio;
