import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import back from "../images/back.png";
import { ExportToExcel } from "../ExportToExcel";
import { db } from "../firebase";

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
  },
  topdiv: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
}));

// const defaultcolumns = [
//   { field: " ", headerName: " ", width: 200, editable: true },
//   {
//     field: "measurement",
//     headerName: "Measurement",
//     width: 180,
//     editable: true,
//   },
//   { field: "number", headerName: "Value", width: 200, editable: true },
//   { field: "units", headerName: "Units", width: 200, editable: true },
//   { field: "pass", headerName: "Pass / No Pass", width: 200, editable: true },
//   { field: "Comments", headerName: "Value", width: 200, editable: true },
// ];

// const defaultrows = [
//   {
//     " ": "Visual test",
//     measurement: "vision",
//     number: 7,
//     units: "in",
//     pass: "pass",
//     comments: "yeah",
//     id: "Visual test",
//   },
//   {
//     " ": "Kaixo Ttst",
//     measurement: "kaixo",
//     number: 7,
//     units: "in",
//     pass: "pass",
//     comments: "yeah",
//     id: "Kaixo test",
//   },
//   {
//     " ": "Iepa test",
//     measurement: "iepa",
//     number: 7,
//     units: "in",
//     pass: "pass",
//     comments: "yeah",
//     id: "Iepa test",
//   },
// ];

const Log = () => {
  const classes = useStyles();
  const { title } = useParams();
  const [table, setTable] = useState([
    { data: { title: "", rows: [], columns: [] } },
  ]);
  const [headers, setHeaders] = useState([]);
  useEffect(() => {
    db.collection("tables").onSnapshot((snapshot) =>
      setTable(
        snapshot.docs
          .map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
          .filter((item) => item.data.title === title)
      )
    );
  }, []);

  const [data, setData] = React.useState([]);
  const fileName = title; // here enter filename for your excel file

  const handleCellEditCommit = React.useCallback(
    ({ id, field, value }) => {},
    [table]
  );

  useEffect(() => {
    //console.log(table[0].data.rows.map((row) => row));
    setHeaders(
      table[0].data.columns.map((column) => {
        if (column.headerName !== "id") {
          //console.log(column.headerName);
          return column.headerName;
        } else {
          return null;
        }
      })
    );
    setData(
      table[0].data.rows.map((row) => {
        delete row.id;
        return row;
      })
    );
  }, [table]);

  // useEffect(() => {
  //   console.log(headers);
  // }, [headers]);

  // useEffect(() => {
  //   console.log("data => ", data);
  // }, [data]);

  return (
    <div className={classes.root}>
      <Link to="/logs">
        <img src={back} className={classes.back} alt="back_button" />
      </Link>
      <ExportToExcel apiData={data} fileName={fileName} headers={headers} />
      <h1>Title: {title}</h1>

      {table ? (
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={table[0].data.rows} //table[0].data.rows
            columns={table[0].data.columns} //table[0].data.columns
            onCellEditCommit={handleCellEditCommit}
            hideFooterSelectedRowCount
            IsReadOnly="True"
          />
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default Log;
