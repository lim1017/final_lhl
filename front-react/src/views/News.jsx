import React, { Component } from "react";

const unirest = require("unirest");

const API_URL = "apidojo-yahoo-finance-v1.p.rapidapi.com";
const API_KEY = "5c656d3d98msh2cf09c036ca1041p1fc345jsn2f46d65f1498";

unirest
  .post(API_URL)
  .header("X-RapidAPI-Key", API_KEY)
  .end(function(result) {
    console.log(result.status, result.headers, result.body);
  });

class News extends Component {
  componentDidMount() {
    const req = unirest(
      "GET",
      "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-charts"
    );

    req.query({
      comparisons: "%5EGDAXI%2C%5EFCHI",
      region: "US",
      lang: "en",
      symbol: "HYDR.ME",
      interval: "5m",
      range: "1d"
    });

    req.headers({
      "X-RapidAPI-Host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
      "X-RapidAPI-Key": "5c656d3d98msh2cf09c036ca1041p1fc345jsn2f46d65f1498"
    });

    req.end(res => {
      if (res.error) throw new Error(res.error);

      this.setState(res.body);
    });
  }
  render() {
    return <p>{console.log(this.state)}</p>;
  }
}

export default News;
