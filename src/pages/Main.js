import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import Menu from "./Menu";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Logs from "./Logs";
import AddLog from "./AddLog";
import AddTemplate from "./AddTemplate";
import LogContent from "./LogContent";

const useStyles = makeStyles({
  root: {
    
  },
});
const Main = () => {
  const classes = useStyles();
  const [registered, setregistered] = useState(false);

  return (
    <div className={classes.root}>
      <Router>
        <Switch>
        <Route path="/logs/:title">
          <LogContent />
        </Route>
          <Route path="/logs">
            <Logs />
          </Route>
          <Route path="/addlog">
            <AddLog />
          </Route>
          <Route path="/template">
          <AddTemplate />
        </Route>
          <Route path="/">
          <Menu />
        </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Main;
