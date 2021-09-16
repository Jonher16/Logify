import { Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import document from "../images/document.png";
import add from "../images/add.png";
import template from "../images/template.png";
import { Link } from "react-router-dom";
import Option from "../components/Option";

const options = [
  {
    title: "Create template",
    image: template,
    link: "/template",
  },
  {
    title: "Add Log",
    image: add,
    link: "/addlog",
  },
  {
    title: "View Logs",
    image: document,
    link: "/logs",
  },
];

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
    marginBottom: "10vh",
    
  },
  title__text: {
    fontSize: "4rem",
    fontWeight: "bold",
    transition: "transform .5s",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },

  options: {
    //border: "1px solid blue",
    flexGrow: 1,
    width: "70vw",
    height: "30vh",
    display: "flex",
    justifyContent: "center",
  },
  option: {
    maxWidth: "7rem",
    width: "40vw",
    height: "40vh",
    maxHeight: "20vh",
    borderRadius: "50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(5),
    backgroundColor: "rgba(50, 50, 168, 0.6)",
    transition: "transform .2s",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    "&:hover": {
      transform: "scale(1.2)",
      backgroundColor: "rgba(50, 50, 168, 0.3)",
      cursor: "pointer",
    },
  },
  option__title: {
    marginTop: "3vh",
  },
  grid: {
    //border: "1px solid yellow",
    height: "50vh",
    minWidth: "80vw",
    display: "flex",
    justifyContent: "space-around",
    spacing: "100px",
  },
}));
const Menu = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography className={classes.title__text}>Logify</Typography>
      </div>
      <div className={classes.options}>
        <Grid className={classes.grid} container spacing={6} xs={6}>
          {options.map((option) => (
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={option.link}
            >
              <Grid item>
                <Option title={option.title} image={option.image} />
              </Grid>
            </Link>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Menu;
