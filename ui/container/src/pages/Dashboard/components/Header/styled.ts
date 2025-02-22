import styled from "@emotion/styled";
import { Theme } from "@mui/material/styles";

export const StyledDashboardHeader = styled.div<{
  theme?: Theme;
  sidebarCollapsed: boolean;
}>(({ theme, sidebarCollapsed }) => {
  const paddingLeft = sidebarCollapsed ? "275px" : "70px";
  return {
    position: "fixed",
    top: 0,
    width: "100%",
    paddingLeft,
    left: 0,
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    zIndex: 555,
    backgroundColor: theme.customStyles.header.background,
    transition: "all 0.4s",
    "& .dashboardHead": {
      background: theme.customStyles.header.background,
      width: "100%",
      display: "flex",
      flexDirection: "row",
      borderBottom: `1px solid ${theme.customStyles.header.borderColor}`,
      padding: "0px 15px",
      boxSizing: "border-box",
      "& .dashboardHeadLeft": {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding:"0px 5px"
      },
      "& .dashboardHeadRight": {
        padding: "10px",
        marginLeft: "auto",
      },
    },
  };
});
