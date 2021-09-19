import { Button, IconButton, makeStyles, TextField, Typography } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import back from "../images/back.png";
import DeleteIcon from '@material-ui/icons/Delete';
import { db } from "../firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(0deg, #0C79F7 30%, #88BFFE 70%)",
    color: "black",
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0",
  },
  title: {
    //border: "1px solid red",
    marginTop: "10vh",
    marginBottom: "2vh",
  },
  title__text: {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "white",
    transition: "transform .5s",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  aboveform: {
    display: "flex",
    flexDirection: "row",
    width: "40vw",
    //border: "1px solid red",
    justifyContent: "space-between",
  },
  form: {
    backgroundColor: "rgba(255, 255, 255,1)",
    marginTop: "1vh",
    minWidth: "80vw",
    minHeight: "65vh",
    borderRadius: "50px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "top",
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
  column1: {
    borderRight: "2px solid rgba(0, 0, 0, 0.19)",
    display: "flex",
    flexDirection: "column",
    width: "50%",
    minHeight: "50vh",
    padding: theme.spacing(2),
    paddingRight: "0",
    alignItems: "center",
  },
  column2: {
    //border: "1px solid red",
    display: "flex",
    flexDirection: "column",
    width: "50%",
    minHeight: "50vh",
    padding: theme.spacing(2),
    paddingRight: "0",
    alignItems: "center",
  },
  formheader: {
    color: "black",
    display: "flex",
    width: "80%",
    alignItems: "center",
    flexDirection: "row",
    //border: "1px solid red",
  },
  textfieldmargin: {
    marginLeft: "0.35vw"
  },
  map: {
    marginTop: "2vh",
  },
  mapitem: {
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      borderRadius: "10px",
      minWidth: "30vw",
      minHeight: "5vh",
      marginBottom: "3vh",
      paddingLeft: "1vw",
      paddingRight: "1vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      transition: "transform .5s",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  binicon: {
    position: "right",
  },
  button: {
    marginBottom: "1vh",
  },
  pass_line: {
    //border: "1px solid red",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const defaultcolumns = [
  {
    field: " ",
    headerName: " ",
    width: 180,
    editable: false,
  },
];

const AddTemplate = () => {
  const classes = useStyles();
  const [rows, setRows] = React.useState([]);
  const [columns, setColumns] = React.useState(defaultcolumns);
  const [title, setTitle] = React.useState("")

  const [columnName, setcolumnName] = React.useState("")
  const [rowName, setrowName] = React.useState("")

    useEffect(() => {
      console.log("columns => ", columns)
    }, [columns])

  const handleSubmitRow = (e) => {
    e.preventDefault()
    if (rowName === "" || rowName.startsWith(" ") === true) {
      setrowName("")
      alert("Invalid row name")
    }
    else {
      setRows([...rows, rowName])
      setrowName("")
    }
  }

  const handleDeleteRow = (e, row) => {
    e.preventDefault()
    let filter = rows.filter(item=>(row !== item))
    setRows(filter)
  }

  const handleSubmitColumn = (e) => {
    e.preventDefault()
    if (columnName === "" || columnName.startsWith(" ") === true) {
      setcolumnName("")
      alert("Invalid column name")
    }
    else {
      setColumns([...columns, {field: columnName, headerName: columnName, editable: true, width: 180 }])
    setcolumnName("")
    }
  }

  const handleDeleteColumn= (e, column) => {
    e.preventDefault()
    let filter = columns.filter(item=>(column !== item))
    setColumns(filter)
  }

  const handleSubmitTemplate = (e) => {
    e.preventDefault();
    if (title === "" || title.startsWith(" ") === true) {
      setTitle("")
      alert("Invalid title")
    }
    else{
    db.collection("templates").add({
      title: title,
      columns: columns,
      rows: rows,
    });
   
    alert("Template submitted succesfully")
    setRows([])
    setColumns(defaultcolumns)
    setTitle("")
  }
  }

  return (
    <div className={classes.root}>
      <Link to="/">
        <img src={back} className={classes.back} alt="back_button" />
      </Link>
      <div className={classes.title}>
        <Typography className={classes.title__text}>
          Add New Template
        </Typography>
      </div>
      <div className={classes.aboveform}>
      <TextField
              id="outlined-basic"
              label="Template title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
      <Button className={classes.button} variant="contained" color="primary" onClick={handleSubmitTemplate}>
        Submit Template
      </Button>
      </div>
      <div className={classes.form}>
        <div className={classes.column1}>
          <form className={classes.formheader} onSubmit={handleSubmitColumn}>
            
            <Typography>Add column:</Typography>
            <TextField
            className={classes.textfieldmargin}
              id="outlined-basic"
              label="Column name"
              variant="outlined"
              value={columnName}
              onChange={(e) => setcolumnName(e.target.value)}
            />
          </form>
          <div className={classes.map}>
            {columns &&
              columns.map((column) => (
                (column.field !== " ") && <div className={classes.mapitem}>
                  <Typography>{column.headerName}</Typography>
                  <IconButton className={classes.binicon}>
                  <DeleteIcon onClick={(e)=>handleDeleteColumn(e, column)}/>
                  </IconButton>
                </div>
              ))}
          </div>
        </div>
        <div className={classes.column2}>
          <form className={classes.formheader} onSubmit={handleSubmitRow}>
            <Typography>Add row:</Typography>
            <TextField
            className={classes.textfieldmargin}
              id="outlined-basic"
              label="Row name"
              variant="outlined"
              value={rowName}
              onChange={(e) => setrowName(e.target.value)}
            />
          </form>
          <div className={classes.map}>
            {rows &&
              rows.map((row) => (
                <div className={classes.mapitem}>
                  <Typography>{row}</Typography>
                  <IconButton className={classes.binicon}>
                  <DeleteIcon onClick={(e)=>handleDeleteRow(e, row)} />
                  </IconButton>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTemplate;
