import React from "react";
import { Grid } from "@mui/material";

export default function Dump() {
  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <Grid container style={{ marginRight: "0px" }}>
            <Grid item xs={12} style={{ padding: "0px 10px" }}>
              CONFIGURATION PAGE
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}