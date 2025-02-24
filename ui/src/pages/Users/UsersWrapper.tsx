import { Grid } from "@mui/material";
import {  Outlet } from "react-router-dom";

export default function UsersWrapper(props) {
  return (
    <Grid container>
      <Grid item xs={12} style={{ padding: "0px 10px" }}>
        USERS WRAPPER
        <Outlet />
      </Grid>
    </Grid>
  );
}
