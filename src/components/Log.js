import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
  accordion_details: {
      display:"flex",
      flexDirection: "column"
  }
}));
const Log = forwardRef(({measurement, criteria, value, notes, pass, unit},ref) => {
  const classes = useStyles();
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{measurement}</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.accordion_details}>
          <Typography>Measurement: {measurement}</Typography>
          <Typography>Criteria: {criteria}</Typography>
          <Typography>value: {value}{unit}</Typography>
          <Typography>pass: { pass ? "yes" : "no"}</Typography>
          <Typography>Notes: {notes}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  )}
)

export default Log;
