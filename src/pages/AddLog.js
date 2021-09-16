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
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import back from "../images/back.png";
import { db } from "../firebase";
import firebase from "firebase";
import { DataGrid } from "@mui/x-data-grid";

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
    marginTop: "2vh",
    borderRadius: "50px",
    display: "flex",
    minWidth: "60vw",
    minHeight: "10vh",
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
}));

const columns = [
  { field: 'measurement', headerName: 'Measurement', width: 180, editable: true },
  { field: 'number', headerName: 'Value', width: 200, editable: true },
];

const defaultrows = [
  {
    id: 1,
    measurement: "Power Test",
    number: 7,
  },
  {
    id: 2,
    measurement: "Speed Test",
    number: 9,
  },
  {
    id: 3,
    measurement: "Visual Test",
    number: 3,
  },
];
const AddLog = () => {
  const classes = useStyles();
  const [title, setTitle] = useState("")
  const [rows, setRows] = React.useState(defaultrows);

  useEffect(() => {
    console.log(rows)
  }, [rows])

  const handleCellEditCommit = React.useCallback(
    ({ id, field, value }) => {
      if (field === 'measurement') {
      
        const measurement = value
        const updatedRows = rows.map((row) => {
          if (row.id === id) {
            return { ...row, measurement };
          }
          return row;
        });
        setRows(updatedRows);
      }
      if (field === 'number') {
        const number = value
        const updatedRows = rows.map((row) => {
          if (row.id === id) {
            return { ...row, number };
          }
          return row;
        });
        setRows(updatedRows);
      }
    },
    [rows],
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection("tables").add({
      title: title,
      columns: columns,
      rows: rows,
    });
    db.collection("tableTitle").add({
      title: title,
    });
    alert("Table submitted succesfully")
  }


  return (
    <div className={classes.root}>
      <Link to="/">
        <img src={back} className={classes.back} alt="back_button" />
      </Link>
      <div className={classes.title}>
        <Typography className={classes.title__text}>Add New Log</Typography>
      </div>
      
      <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        onCellEditCommit={handleCellEditCommit}
        hideFooterSelectedRowCount
      />
    </div>
    <form className={classes.form} onSubmit={handleSubmit}>
            <TextField classname={classes.textfield}
              id="outlined-basic"
              label="Table Name"
            InputProps={{
              style: {
                  color: "white"
              }
          }}
              variant="filled"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Button className={classes.button} variant="contained" color="primary" onClick={handleSubmit}>
              Submit Table
            </Button>
          </form>

    </div>
  );
}

export default AddLog;
