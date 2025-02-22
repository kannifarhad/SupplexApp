import styled from "@emotion/styled";
import { Theme } from "@mui/material/styles";

export const StyledDashboardSubHeader = styled.div<{
  theme?: Theme;
}>(({ theme }) => {
  return {
    background: theme.customStyles.header.background,
    borderBottom:  `1px solid ${theme?.customStyles.sideBar.borderColor}`,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    ".subHeaderInfo": {
      padding: "9px 0px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",

      ".title": {
        borderRight: `1px solid ${theme?.customStyles.sideBar.borderColor}`,
        fontWeight: 600,
        color: theme.customStyles.text.headings,
        padding: "10px 25px",
        fontSize: "16px",
        lineHeight: "16px",

        ".icon": {
          paddingRight: "10px",
        },
      },

      ".description": {
        padding: "10px 25px",
        fontSize: "14px",
        lineHeight: "16px",
        color: theme.customStyles.text.main,
        textTransform: "capitalize",
      },
    },

    ".subHeaderToolbar": {
      marginLeft: "auto",
      padding: "0px 30px",
    },
  };
});