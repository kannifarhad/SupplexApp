import styled from "@emotion/styled";
import { Theme } from "@mui/material/styles";

export const StyledFooter = styled.div<{
  theme?: Theme;
}>(({ theme }) => {
  return {
    position: "absolute",
    fontSize: "12px",
    background: theme.customStyles.header.background,
    width: "100%",
    bottom: "0px",
    padding: "10px 20px",
    color: theme.customStyles.text.main,
    a: {
      display: "inline-block",
      color: theme.customStyles.text.active,
      padding: "5px 10px 5px 0px",
      fontSize: "12px",
    },
    div: {
      display: "inline-block",
      "&.copyright": {
        marginRight: "50px",
      },
    },
  };
});

export const StyledDashboardContent = styled.div`
  height: 100%;
  overflow: auto;
  width: 100%;
  padding: 0px;
  margin: 0px;
  flex-shrink: 1;
  flex-grow: 1;
`;

export const StyledDashboardContainer = styled.div<{
  theme?: Theme;
}>(({ theme }) => {
  return {
    width: "100%",
    position: "relative",
    padding: "59px 0px 50px 0px",
    minWidth: "0",
    background: theme.customStyles.dashboarContinaerBg,
    ".dashboardContentWrapper": {
      height: "100%",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    },
  };
});

export const StyledDashboardWraper = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: row;
  height: 100vh;
  overflow: hidden;
`;
