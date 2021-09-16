import { Button, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import back from "../images/back.png";
import firebase from "firebase"
import {db} from "../firebase"

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
  button: {
    marginTop: "10vh",
  }
}));

const defaultcolumns = [
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

const Log = () => {
  const classes = useStyles();
  const { title } = useParams();

  const [rows, setRows] = useState(defaultrows);
  const [columns, setColumns] = useState(defaultcolumns);
  const [table, setTable] = useState([{data: {title: "default", rows: [], columns: []}}])

  useEffect(() => {
    db.collection("tables").onSnapshot((snapshot) =>
      setTable(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        })).filter(item => item.data.title === title)
        )    
    )

  }, []);
  
  useEffect(() => {
    
    

  }, [table])

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

  return (
    <div className={classes.root}>
      <Link to="/logs">
        <img src={back} className={classes.back} alt="back_button" />
      </Link>
      <h1>Title: {title}</h1>

      { table && <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={table[0].data.rows}
        columns={table[0].data.columns}
        onCellEditCommit={handleCellEditCommit}
        hideFooterSelectedRowCount
      />
    </div>}
    </div>
  );
};

export default Log;
