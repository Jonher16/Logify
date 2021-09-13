import {
  makeStyles,
  TextField,
  Typography,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import back from "../images/back.png";
import {db} from "../firebase";
import firebase from "firebase"

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

const AddLog = () => {
  const classes = useStyles();
  const [log, setlog] = useState({ 
    measurement: "",
    value: "",
    unit: "",
    criteria: "",
    pass: false,
    notes: "",
  })

  const submitLog = (e) => {
    e.preventDefault();
    if (log.measurement==="" || log.criteria==="" || log.value===""|| log.unit===""|| log.notes==="" ) {
      alert("You have to fill all fields first")
  }
  else {
    db.collection("logs").add({
      measurement: log.measurement,
      value: log.value,
      unit: log.unit,
      criteria: log.criteria,
      pass: log.pass,
      notes: log.notes,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setlog({measurement: "",
    value: "",
    unit: "",
    criteria: "",
    pass: false,
    notes: "",})
    alert("Log added successfully")
  }
  }

  return (
    <div className={classes.root}>
      <Link to="/">
        <img src={back} className={classes.back} alt="back_button" />
      </Link>
      <div className={classes.title}>
        <Typography className={classes.title__text}>Add New Log</Typography>
      </div>
      <form className={classes.form}>
        <div className={classes.column1}>
          <TextField
          value={log.measurement}
          onChange={(e) => {
            setlog({ ...log, measurement: e.target.value, })}}
            id="outlined-basic"
            label="Measurement"
            variant="outlined"
          />
          <div className={classes.value_line}>
            <TextField
              className={classes.value}
              value={log.value}
            onChange={(e) => setlog({ ...log, value: e.target.value, })}
              id="outlined-basic"
              label="Value"
              variant="outlined"
            />
        
            <FormControl variant="outlined" className={classes.unit}>
              <InputLabel id="demo-simple-select-outlined-label">
                Unit
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Unit"
                value={log.unit}
            onChange={(e) => setlog({ ...log, unit: e.target.value, })}
              >
                <MenuItem >
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"in"}>in</MenuItem>
                <MenuItem value={"ft"}>ft</MenuItem>
                <MenuItem value={"m"}>m</MenuItem>
              </Select>
            </FormControl>
          </div>
          <TextField
            id="outlined-basic"
            value={log.criteria}
            onChange={(e) => setlog({ ...log, criteria: e.target.value, })}
            label="Acceptance Criteria"
            variant="outlined"
          />
          <div className={classes.pass_line}>
            <Typography style={{ color: "grey" }}>Pass</Typography>
            <Checkbox
              checked={log.pass}
              onChange={(e) => setlog({ ...log, pass: !log.pass })}
              color="primary"
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
          </div>
        </div>
        <div className={classes.column2}>
          <TextField
            id="outlined-basic"
            className={classes.notes}
            multiline
            rows={8}
            value={log.notes}
            onChange={(e) => setlog({ ...log, notes: e.target.value, })}
            label="Notes"
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={submitLog}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddLog;
