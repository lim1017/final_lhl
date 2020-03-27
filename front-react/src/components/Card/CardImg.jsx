import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import MUButton from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import appDataContext from "../../hooks/reducers/useContext";

export default function CardImg(props) {
  const [button1, setButton1] = useState({
    color: "linear-gradient(45deg, #ec407a 30%, #f48fb1 90%)",
    x: 0
  });

  const style = {
    background: "linear-gradient(45deg, #ec407a 30%, #f48fb1 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 35,
    width: 80,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px #4a148c 30%",
    marginLeft: 0
  };

  return (
    <Card id="education" style={{ maxWidth: 345 }}>
      {/* <CardActionArea> */}
      <CardMedia
        component="img"
        alt={props.title}
        height="200"
        image={props.image}
        title={props.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          <a target="_blank" rel="noopener noreferrer" href={props.link}>
            {props.title}
          </a>
        </Typography>

        <MUButton
          style={{
            ...style,
            background: button1.color,
            marginTop: "4px"
          }}
          onMouseLeave={() =>
            setButton1({
              ...button1,
              color: "linear-gradient(45deg, #ec407a 30%, #f48fb1 90%)"
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
              x: 2
            })
          }
          onClick={() => props.readArticle()}
        >
          Mark Read
        </MUButton>

        {props.allAnswers[`${props.id}`] ? (
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQEb-I72D8063lA3rsK57jiHw6Ted5iJpJ0aTW3ZxdBYF9rUXiZ"
            width="55"
            height="40"
            alt="Smart Pig"
          ></img>
        ) : null}
      </CardContent>
      {/* </CardActionArea> */}
    </Card>
  );
}
