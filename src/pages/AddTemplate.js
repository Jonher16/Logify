import { makeStyles } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import back from "../images/back.png";

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
      title: {
        //border: "1px solid red",
        marginTop: "10vh",
        marginBottom: "5vh",
      },
      title__text: {
        fontSize: "3rem",
        fontWeight: "bold",
        transition: "transform .5s",
        "&:hover": {
          transform: "scale(1.1)",
        },
      },
      form: {
        backgroundColor: "rgba(255, 255, 255,1)",
        height: "60vh",
        minWidth: "40vw",
        minHeight: "65vh",
        borderRadius: "50px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          transition: "transform .5s",
          "&:target": {
            transform: "scale(1.1)",
          },
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
      value_line: {
        //border: "1px solid red",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        
      },
      value: {
        width: "53%"
      },
      unit: {
          width:"30%"
      },
      column1: {
        //border: "1px solid red",
        display: "flex",
        flexDirection: "column",
        width: "50%",
        height: "70%",
        padding: theme.spacing(2),
        paddingRight: "0",
        justifyContent: "space-around",
        alignItems: "center",
      },
      column2: {
        //border: "1px solid blue",
        height: "70%",
        display: "flex",
        flexDirection: "column",
        width: "50%",
        padding: theme.spacing(1),
        marginTop: "2.1vh",
        justifyContent: "space-around",
        alignItems: "center",
      },
      notes: {
        height: "70%",
      },
      button: {
        marginTop: "3vh",
      },
      pass_line: {
        //border: "1px solid red",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      },
}));
const AddTemplate = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Link to="/">
        <img src={back} className={classes.back} alt="back_button" />
      </Link>
      
    </div>
  );
};

export default AddTemplate;
