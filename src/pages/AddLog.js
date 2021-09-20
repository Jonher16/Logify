import {
  makeStyles,
  TextField,
  Typography,
  Button,
  MenuItem,
  IconButton,
  Card,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import back from "../images/back.png";
import { db } from "../firebase";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@material-ui/icons/Delete"
import nuuk from "../images/nuuk.png"

const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(0deg, #0C79F7 30%, #88BFFE 70%)",
    color: "white",
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
  menuitem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  template: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "2vh",
    minHeight: "4vh",
    justifyContent: "space-between",
    paddingLeft: "1vh",
    transition: "transform .2s",
    "&:hover": {
      transform: "scale(1.05)",
    }
  }
}));

let filteredtemplate =[];

const defaultcolumns = [];

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
  const [title, setTitle] = useState("");
  const [rows, setRows] = React.useState(defaultrows);
  const [columns, setColumns] = React.useState(defaultcolumns);
  const [templates, settemplates] = useState([]);
  const [selectedTemplate, setselectedTemplate] = useState();

  useEffect(() => {
    console.log(rows);
    console.log(columns);
    console.log(title)
  }, [rows]);

  useEffect(() => {
    db.collection("templates").onSnapshot((snapshot) =>
      settemplates(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  const handleChange = (event) => {
    let templateSel = event.target.value;
    filteredtemplate = templates.filter(
      (item) => item.data.title === templateSel
    );
    //console.log("filteredtemplate ", filteredtemplate);
    setColumns(filteredtemplate[0].data.columns.map((item) => item));
    setRows(filteredtemplate[0].data.rows.map((row) => ({ id: row, " ": row })));
    setselectedTemplate(templateSel);
  };

  const handleCellEditCommit = React.useCallback(
    ({ id, field, value }) => {
      
      for (let i = 0; i < columns.length; i++) {

        if (field === columns[i].field) {
          const updatedRows = rows.map((row) => {
            if (row.id === id) {
              return { ...row, [columns[i].field]: value };
            }
            return row;
          });
          setRows(updatedRows);
        }
      }
    },
    [rows]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    let columnsWithoutEdit = columns.map(column=>{column.editable = false; return column})
    db.collection("tables").add({
      title: title,
      columns: columnsWithoutEdit,
      rows: rows,
    });
    alert("Table submitted succesfully");
    setColumns(filteredtemplate[0].data.columns.map((item) => item));
    setRows(filteredtemplate[0].data.rows.map((row) => ({ id: row, " ": row })));
    setTitle("")
  };

  const handleDeleteTemplate = (e, id) => {
    e.preventDefault();
    if (window.confirm("Do you want to delete the template forever?")) {
     db.collection("templates").doc(id).delete()
      alert("Template deleted")
    }
    else alert("Template was not deleted")
     }
  return (
    <div className={classes.root}>
      <img style={{height:"60px", width: "150px", position: "absolute", zindex: 999, right:"2vw", top: "2vh"}} src={nuuk} alt="nuuk"></img>
      <Link to="/">
        <img src={back} className={classes.back} alt="back_button" />
      </Link>
      <div className={classes.title}>
        <Typography className={classes.title__text}>Add New Log</Typography>
      </div>
      {selectedTemplate ? (
        <>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              onCellEditCommit={handleCellEditCommit}
              hideFooterSelectedRowCount
            />
          </div>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              classname={classes.textfield}
              id="outlined-basic"
              label="Table Name"
              InputProps={{
                style: {
                  color: "white",
                },
              }}
              variant="filled"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Submit Table
            </Button>
          </form>
        </>
      ) : (
        <div>
          <TextField
            id="outlined-select-currency"
            select
            label="Select"
            value={selectedTemplate}
            onChange={handleChange}
            helperText="Please select your template"
            variant="outlined"
          >
            {templates.map((option) => (
              
              <MenuItem key={option.data.title} value={option.data.title}>
                {option.data.title}
              </MenuItem>
         
            ))}
          </TextField>
          <div className={classes.templatelist}>
            <Typography style={{marginBottom: "3vh", marginTop: "2vh"}}>Template list: </Typography>
          {templates.map(
          ({
            id,
            data: {
              title,
            },
          }) => (
            <Card className={classes.template} id={id}>
              <Typography >{title}</Typography>
              <IconButton>
            <DeleteIcon onClick={(e)=>handleDeleteTemplate(e, id)} />
          </IconButton>
              </Card>
          )
        )}
            </div>
        </div>
      )}
    </div>
  );
};

export default AddLog;
