import { Grid } from "@mui/material";
import ContentWrapper from "../Dashboard/ContentWrapper";
import { memo } from "react";
import UsersTable from "./components/UsersTable";

function UsersList({ title, description, toolbar }) {
  return (
    <ContentWrapper title={title} description={description} toolbar={toolbar}>
      <Grid container>
        <Grid item xs={12} style={{padding: '0px 20px'}}>
          <UsersTable />
        </Grid>
      </Grid>
    </ContentWrapper>
  );
}
export default memo(UsersList);
