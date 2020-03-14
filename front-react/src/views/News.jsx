import React, { Component, useState } from "react";
import CardImg from "components/Card/CardImg.jsx";
import { ProgressBar } from "react-bootstrap";
import { articles } from "variables/EducationArticles.jsx";
import MyVerticallyCenteredModal from "components/MyVerticallyCenteredModal/MyVerticallyCenteredModal.jsx";

require("dotenv").config();

const API_URL = "apidojo-yahoo-finance-v1.p.rapidapi.com";
const API_KEY = process.env.REACT_APP_YAHOO_API_KEY;

const unirest = require("unirest");

class News extends Component {
  constructor() {
    super();
    this.state = {};
    // this code gets run when its created
  }

  componentDidMount = () => {
    const req = unirest(
      "GET",
      "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-newsfeed"
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
      "X-RapidAPI-Host": API_URL,
      "X-RapidAPI-Key": API_KEY
    });

    req.end(res => {
      if (res.error) throw new Error(res.error);
      console.log({ state: res.body });
      this.setState(res.body);
    });
  };

  render() {
    return (
      <div>
        {this.state.items &&
          this.state.items.result.map(element => {
            const { uuid, title, link, main_image } = element;
            return (
              <div className="news-article">
                <CardImg
                  key={uuid}
                  title={title}
                  link={link}
                  image={main_image && main_image.original_url}
                />
              </div>
            );
          })}
      </div>
    );
  }
}

export default News;
