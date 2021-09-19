import {
  Card,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { forwardRef } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import { db } from "../firebase";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  card: {
    width: "95%",
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
  },
  binicon: {
    position: "right",
  },
}));
const Log = forwardRef(({title ,id}, ref) => {
  const classes = useStyles();

  const handleDeleteLog = (e) => {
 e.preventDefault();
 if (window.confirm("Do you want to delete the log forever?")) {
  db.collection("tables").doc(id).delete()
   alert("Log deleted")
 }
 else alert("Log was not deleted")
  }

  return (
    <div className={classes.root}>
      <Link to={`/logs/${title}`} style={{ textDecoration: "none", width: "90%"}}>
      <Card className={classes.card}>
        <Typography className={classes.title}>{title}</Typography>
      </Card>
      </Link>
      <IconButton className={classes.binicon}>
            <DeleteIcon onClick={(e)=>handleDeleteLog(e)} />
          </IconButton>
      </div>
      
  )}
)

export default Log;
