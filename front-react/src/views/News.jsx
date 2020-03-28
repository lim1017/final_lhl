import React, { useEffect, useState } from "react";
import CardNews from "components/Card/CardNews.jsx";
import Grid from "@material-ui/core/Grid";
import noimage from "assets/img/sadpig.png";
import unirest from "unirest";

require("dotenv").config();

const API_URL = "apidojo-yahoo-finance-v1.p.rapidapi.com";
const API_KEY = process.env.REACT_APP_YAHOO_API_KEY;

const News = () => {
  const [newsItems, setNewsItems] = useState();

  // UNCOMMENT STOCKTICKERS TO RENDER TICKETS,
  // COMMENTED OUT BECAUSE WERE OVER OUR API LIMIT
  const [stockTickers, setStockTickers] = useState();

  const fetchFeed = () => {
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

      setNewsItems(res.body.items);
    });
  };

  const fetchTickers = () => {
    const req = unirest(
      "GET",
      "https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-summary"
    );

    req.query({
      region: "US",
      lang: "en"
    });

    req.headers({
      "X-RapidAPI-Host": API_URL,
      "X-RapidAPI-Key": API_KEY
    });

    req.end(res => {
      if (res.error) throw new Error(res.error);

      setStockTickers(res.body.marketSummaryResponse.result);
    });
  };

  useEffect(() => {
    fetchFeed();
    fetchTickers();
  }, []);

  const renderTicker = delayed => {
    return (
      <div className={`ticker-wrapper ${delayed ? delayed : ""}`}>
        {stockTickers &&
          stockTickers.map((stockTicker, index) => {
            return (
              <div key={index} className="ticker">
                {stockTicker.shortName || stockTicker.symbol} -{" "}
                {stockTicker.regularMarketPrice.fmt}
                <div
                  className={
                    stockTicker.regularMarketChangePercent.raw >= 0
                      ? "stock-direction stock-up"
                      : "stock-direction stock-down"
                  }
                />
              </div>
            );
          })}
      </div>
    );
  };

  return (
    <>
      <div className="ticker-wrapper-outer">
        {renderTicker()}
        {renderTicker("delayed")}
      </div>

      <div className="card-news-wrapper">
        <Grid container spacing={3}>
          {newsItems &&
            newsItems.result.map(element => {
              const { uuid, title, link, main_image } = element;
              return (
                <CardNews
                  key={uuid}
                  title={title}
                  link={link}
                  image={
                    main_image && main_image.original_url
                      ? main_image.original_url
                      : noimage
                  }
                />
              );
            })}
        </Grid>
      </div>
    </>
  );
};

export default News;
