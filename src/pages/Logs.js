import React, { useEffect, useState } from "react";
import back from "../images/back.png";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import Log from "../components/Log";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(0deg, #0C79F7 30%, #88BFFE 70%)",
    color: "white",
    minHeight: "100vh",
    width: "100vw",
    maxWidth: "100vw",
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
    logs: {
        //border: "1px solid red",
        marginTop: "10vh",
        minWidth: "70vw",
        
    },
    title: {
      //border: "1px solid red",
      marginTop: "10vh",
    },
    title__text: {
      fontSize: "3rem",
      fontWeight: "bold",
      transition: "transform .5s",
      "&:hover": {
        transform: "scale(1.1)",
      },
    },
}));

const Logs = () => {
  const classes = useStyles();
  const [loglist, setloglist] = useState([])

  useEffect(() => {
    db.collection("logs").onSnapshot(
      (snapshot) =>
        setloglist(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
    );
  }, [loglist]);

  return (
    <div className={classes.root}>
      <Link to="/">
        <img src={back} className={classes.back} alt="back_button" />
      </Link>
      <div className={classes.title}>
        <Typography className={classes.title__text}>Logs</Typography>
      </div>
      <div className={classes.logs}>

      {loglist.map(({id, data: {measurement, criteria, value, notes, pass, unit, timestamp}}) => (
            <Log
              key={id}
              id={id}
              measurement={measurement}
              criteria={criteria}
              value={value}
              notes={notes}
              pass={pass}
              unit={unit}
              timestamp={timestamp}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Logs;
