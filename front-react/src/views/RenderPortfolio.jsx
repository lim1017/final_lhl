import React from "react";
import Grid from "@material-ui/core/Grid";
import { Link, useRouteMatch } from "react-router-dom";

import CardExplained from "components/Card/CardExplained";
import CardPortfolio from "components/Card/CardPortfolio";

function RenderPortfolio(props) {
  console.log("RENDER PROPS", props);
  // let match = useRouteMatch();

  return (
    <div className="risk-assessment-review-container">
      <div className="review-background-image">
        {/* RENDER PORTFOLIO DISTRIBUTION */}

        {/* EQUITY INFORMATION RENDERED ONCE QUESTIONNAIRE COMPLETE */}
        <div>
          <div className="stocks-bonds-cash-explained">
            <Grid container spacing={1}>
              <Grid
                item
                xs={12}
                style={{
                  maxWidth: 650,
                  opacity: 0.9,
                  margin: "auto",
                  marginBottom: 20,
                  marginTop: 20,
                  padding: 20,
                  backgroundColor: "white"
                }}
              >
                <CardPortfolio
                  portfolioDistribution={props.portfolioDistribution}
                  state={props.state}
                ></CardPortfolio>
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <CardExplained></CardExplained>
            </Grid>
            <div className="review-start-button-div">
              <Link to={`/admin/portfolio/start`}>
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
        </div>
      </div>
    </div>
  );
}

export default RenderPortfolio;
