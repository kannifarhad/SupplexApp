import React from "react";
import { Grid } from "@mui/material";
import ContentWrapper from "./components/Layout/ContentWrapper";
const NotFound: React.FC = () => {
  return (
    <ContentWrapper
      title="Not found"
      description="The page that you looking for does not exists"
    >
      <Grid container>
        <Grid item xs={6}>
          <Grid container style={{ marginRight: "0px" }}>
            <Grid item xs={12} style={{ padding: "0px 10px" }}>
              PAGE NOT FOUND
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ContentWrapper>
  );
};

export default NotFound;
