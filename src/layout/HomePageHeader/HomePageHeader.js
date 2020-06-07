import React from "react";
import { Grid } from "@material-ui/core";
//import { Style } from "./HomePageHeader.style";
import './style.css'
const HomePageHeader = () => {
  return (
    <Grid container className="topBarContainer">
      <Grid item md={4} container justify="center" direction="row">
        <span>
        <Grid item  container>
          <img src="logo_be.svg" className="borgoLogo" alt="Borgo" />
        </Grid>
        </span>
      </Grid>
      
    </Grid>
  );
};

export default HomePageHeader
