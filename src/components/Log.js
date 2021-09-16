import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { forwardRef } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(0deg, #0C79F7 30%, #88BFFE 70%)",
    color: "white",
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0",
  },
  back: {
    position: "absolute",
    zindex: 999,
    left: 20,
    top: 20,
    height: "50px",
    width: "50px",
    transition: "transform .2s",
    "&:hover": {
      transform: "scale(1.2)",
    },
  },
  card: {
    marginBottom: "1vh",
    height: "5vh",
    alignItems: "center",
    transition: "transform .2s",
    "&:hover": {
      transform: "scale(1.05)",
    }
  },
  title: {
    marginTop: "0.8vh",
    fontSize:"1rem",
    marginLeft: "1vw"
  }
}));
const Log = forwardRef(({title}, ref) => {
  const classes = useStyles();
  return (
      <Card className={classes.card}>
        <Typography className={classes.title}>{title}</Typography>
      </Card>
  )}
)

export default Log;
