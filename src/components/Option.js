import { makeStyles, Typography } from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles((theme) => ({
    
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
          cursor: "pointer"
        }
    },
    option__title: {
      marginTop: "3vh",
    },
  }));
const Option = ({title, image}) => {
    const classes = useStyles();
    return (
            <div className={classes.option}>
                   <img
                     src={image}
                     style={{ width: "5rem", height: "5rem" }}
                     alt="document"
                   />
                   <Typography className={classes.option__title}>{title}</Typography>
                 </div>
    )
}

export default Option
