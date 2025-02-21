import { Grid } from "@mui/material";
import ContentWrapper from "../../Dashboard/ContentWrapper";
import { memo } from "react";
import  UserAddForm from "./UserAddForm";

function UserAdd({ title, description, toolbar }) {
  return (
    <ContentWrapper title={title} description={description} toolbar={toolbar}>
      <Grid container>
        <Grid item xs={12} style={{ padding: "20px" }}>
          <UserAddForm />
        </Grid>
      </Grid>
    </ContentWrapper>
  );
}
export default memo(UserAdd);
