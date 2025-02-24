import { Box, Grid, Paper } from "@mui/material";
import ContentWrapper from "../Dashboard/components/Layout/ContentWrapper";
import { memo } from "react";

function UsersList({ title, description }) {
  return (
    <ContentWrapper title={title} description={description}>
      <Grid container>
        <Grid item xs={12}>
          
        </Grid>
      </Grid>
    </ContentWrapper>
  );
}
export default memo(UsersList);
