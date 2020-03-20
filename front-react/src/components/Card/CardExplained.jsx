import React from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/Grid";

export default function CardExplained(props) {
  return (
    <>
      <Grid item xs={6}>
        <Card
          style={{
            maxWidth: 500,
            opacity: 0.8,
            margin: "auto",
            marginBottom: 20,
            marginTop: 20,
            padding: 20,
            backgroundColor: "white"
          }}
        >
          <TextField>
            Cash: There are no fluctuations in your cash. However, you are
            guaranteed to lose ~2% every year due to inflation. You should hold
            some cash for emergencies but it should always be invested. <br />
            Expected Return: None Risk: Extremely Low
          </TextField>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card
          style={{
            maxWidth: 500,
            opacity: 0.8,
            margin: "auto",
            marginBottom: 20,
            marginTop: 20,
            padding: 20,
            backgroundColor: "white"
          }}
        >
          <TextField>
            Government Bonds: These are amongst the safest investments you can
            make. There is no chance of defaulting unless the governments'
            central bank defaults. <br />
            Expected Return: 1-2% Risk: Very Low
          </TextField>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card
          style={{
            maxWidth: 500,
            opacity: 0.8,
            margin: "auto",
            marginBottom: 20,
            marginTop: 20,
            padding: 20,
            backgroundColor: "white"
          }}
        >
          <TextField>
            Corporate Bonds: Very safe investment, slightly more risky than
            government bonds. There is an extremely low chance of defaulting
            unless the company goes bankrupt.
            <br />
            Expected Return: 3-4% Risk: Low
          </TextField>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card
          style={{
            maxWidth: 500,
            opacity: 0.8,
            margin: "auto",
            marginBottom: 20,
            marginTop: 20,
            padding: 20,
            backgroundColor: "white"
          }}
        >
          <TextField>
            Low Volatility Index: Very safe index fund primarily comprised of
            corporations that don't fluctuate with the market (i.e. Coca-Cola).
            <br />
            Expected Return: ~5% Risk: Low
          </TextField>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card
          style={{
            maxWidth: 500,
            opacity: 0.8,
            margin: "auto",
            marginBottom: 20,
            marginTop: 20,
            padding: 20,
            backgroundColor: "white"
          }}
        >
          <TextField>
            S&P/TSX Composite Index: Buying the entire S&P/TSX (North American)
            index. This is relatively more risky as the market fluctuates,
            however, returns will be much higher.
            <br />
            Expected Return: ~8% Risk: Medium
          </TextField>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card
          style={{
            maxWidth: 500,
            opacity: 0.8,
            margin: "auto",
            marginBottom: 20,
            marginTop: 20,
            padding: 20,
            backgroundColor: "white"
          }}
        >
          <TextField>
            Emerging Markets Index: Buying stocks from the index of an emerging
            economy such as Africa or India. This is very risky as stocks will
            be extremely volatile, however, there is a potential for very high
            returns.
            <br />
            Expected Return: ~10% Risk: High
          </TextField>
        </Card>
      </Grid>
    </>
  );
}
