import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";

export default function CardNews(props) {
  return (
    <Card
      style={{
        maxWidth: 800,
        margin: "auto",
        marginBottom: 20,
        marginTop: 20,
        padding: 20,
        backgroundColor: "#e9f5eb"
      }}
    >
      {/* <CardActionArea> */}
      <CardContent>
        <Typography gutterBottom variant="h3">
          <a href={props.link}>{props.title}</a>
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        alt={props.title}
        height="500"
        image={props.image}
        title={props.title}
      />
    </Card>
  );
}
