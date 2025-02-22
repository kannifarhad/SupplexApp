import { Grid } from "@mui/material";
import ContentWrapper from "../../Dashboard/components/Layout/ContentWrapper";
import { memo } from "react";
import  UserAddForm from "./UserAddForm";

function UserAdd(props) {
  return (
    <ContentWrapper {...props}>
      <Grid container>
        <Grid item xs={12} style={{ padding: "20px" }}>
          <UserAddForm />
        </Grid>
      </Grid>
    </ContentWrapper>
  );
}
export default memo(UserAdd);
