import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

export default function CardNews(props) {
  return (
    <Grid item xs={6}>
      <Card
        style={{
          maxWidth: 800,
          margin: "auto",
          marginBottom: 20,
          marginTop: 20,
          padding: 20,
          backgroundColor: "white"
        }}
      >
        {/* <CardActionArea> */}
        <CardContent>
          <Typography gutterBottom variant="h3">
            <a style={{ color: "#EC407A" }} target="_blank" href={props.link}>
              {props.title}
            </a>
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
    </Grid>
  );
}
