import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import routes from "./routes/routes";
import { Redirect, Switch, Route, withRouter } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({}));

function Main(props) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {isLoading ? (
        <CircularProgress className={classes.progress} />
      ) : (
        <>
          <div className={classes.mainContainer}>
            <Switch>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  exact
                  component={route.component}
                />
              ))}
            </Switch>
          </div>
        </>
      )}
    </>
  );
}
export default withRouter(Main);
