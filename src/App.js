import React from "react";
import {Grid} from "@material-ui/core";
import "./styles.css";

export default function App() {
  return (
    <Grid container className="App">
        <Grid item sm={6} xs={6}>
          <p>half</p>
        </Grid>

        <Grid item sm={6} xs={6}>
          <p>another half</p>
        </Grid>
    </Grid>
  );
}
