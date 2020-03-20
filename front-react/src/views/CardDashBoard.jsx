import React from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import BriefPortfolio from "./BriefPortfolio";

function CardDashBoard(props) {
  return (
    <>
      <Grid item xs={6}>
        <Card
          style={{
            maxWidth: 500,
            minHeight: 500,
            opacity: 0.8,
            margin: "auto",
            marginBottom: 20,
            marginTop: 20,
            padding: 20,
            backgroundColor: "white"
          }}
        ></Card>

        <Card
          style={{
            maxWidth: 500,
            minHeight: 500,
            opacity: 0.8,
            margin: "auto",
            marginBottom: 20,
            marginTop: 20,
            padding: 20,
            backgroundColor: "white"
          }}
        ></Card>
      </Grid>

      <Grid item xs={6}>
        <Card
          style={{
            maxWidth: 500,
            minHeight: 500,
            opacity: 0.8,
            margin: "auto",
            marginBottom: 20,
            marginTop: 20,
            padding: 20,
            backgroundColor: "white"
          }}
        >
          {" "}
          <BriefPortfolio state={props.state}></BriefPortfolio>
        </Card>
        <Card
          style={{
            maxWidth: 500,
            minHeight: 500,
            opacity: 0.8,
            margin: "auto",
            marginBottom: 20,
            marginTop: 20,
            padding: 20,
            backgroundColor: "white"
          }}
        ></Card>
      </Grid>
    </>
  );
}

export default CardDashBoard;
