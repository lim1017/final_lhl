import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Link, useRouteMatch } from "react-router-dom";

import CardExplained from "components/Card/CardExplained";
import CardPortfolio from "components/Card/CardPortfolio";
import MUButton from "@material-ui/core/Button";

function RenderPortfolio(props) {
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
                  opacity: 0.95,
                  margin: "auto",
                  marginBottom: 20,
                  marginTop: 20,
                  padding: 20,
                  backgroundColor: "#272727",
                  color: "#e7e7e7"
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
                <MUButton
                  style={{
                    ...style,
                    background: button1.color,
                    height: 70 - button1.x,
                    width: 350 - button1.x
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
                  className="risk-assessment-start-button"
                >
                  Re-Do Risk Assessment
                </MUButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RenderPortfolio;
