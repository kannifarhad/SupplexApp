import { Box, Grid, Paper } from "@mui/material";
import ContentWrapper from "../Dashboard/ContentWrapper";
import { memo } from "react";
import UsersTable from "./components/UsersTable";

function UsersList({ title, description }) {
  return (
    <ContentWrapper title={title} description={description}>
      <Grid container>
        <Grid item xs={12}>
          <UsersTable />
        </Grid>
      </Grid>
    </ContentWrapper>
  );
}
export default memo(UsersList);
