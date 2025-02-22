import { Grid } from "@mui/material";
import ContentWrapper from "../Dashboard/components/Layout/ContentWrapper";
import { memo } from "react";

function UserAdd({ title, description }) {
  return (
    <ContentWrapper title={title} description={description}>
      <Grid container>
        <Grid item xs={6}>
          <Grid container style={{ marginRight: "0px" }}>
            <Grid item xs={12} style={{ padding: "0px 10px" }}>
            UserAdd
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ContentWrapper>
  );
}
export default memo(UserAdd);
