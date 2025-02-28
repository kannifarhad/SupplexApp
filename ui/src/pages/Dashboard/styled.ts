import styled from "@emotion/styled";
import { Theme } from "@mui/material/styles";

export const StyledAuthPage = styled.div<{
  theme?: Theme;
}>(({ theme }) => {
  return {
    minHeight: "100%",
    display: "flex",
    height: "100vh",
    flexDirection: "row",
    "> div": {
      padding: "50px",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      height: "100vh",
    },

    ".loginInfo": {
      maxWidth: "1000px",
      backgroundPosition: "center center",
      backgroundSize: "cover",
      color: "#fff",
      position: "relative",
      ".bubbles": {
        content: '""',
        width: "100%",
        height: "100%",
        position: "absolute",
        right: "0px",
        backgroundPosition: "right top",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      },
      ".cronusInfoWrap": {
        width: "90%",
        ".iconBlock": {
          width: "100px",
          height: "100px",
          margin: "0px auto",
          svg: {
            width: "100px",
            height: "100px",
          },
        },
      },
    },

    ".loginPanel": {
      width: "100%",
      overflow: "auto",
    },

    ".cronusInfoFooter": {
      color: "var(--headlineColor)", // Assuming CSS variable is defined
      bottom: "0px",
      width: "100%",
      margin: "0px auto",
      textAlign: "center",
      left: "0px",
      "a": {
        color: "var(--headlineColor)",
      },
      "> div": {
        display: "block",
        margin: "0px auto !important",
        fontSize: "12px",
      },
    },

    ".cronusInfo": {
      padding: "30px 10px",
      h3 : {
        textAlign: "center",
      },
      p: {
        textAlign: "center",
        color: "@lightTextColor"
      },
    },

    "@media only screen and (min-width: 100px) and (max-width: 768px)": {
      flexDirection: "column",
      height: "auto",
      ".loginWrap": {
        minHeight: "100%",
        display: "flex",
        height: "auto",
        flexDirection: "column",
        "> div": {
          height: "500px",
        },
      },
      ".loginInfo": {
        paddingBottom: "100px",
        overflow: "hidden",
        ".bubbles": {
          left: "0px",
          transform: "rotate(90deg)",
          width: "768px",
          height: "768px",
          bottom: "0px",
        },
        ".cronusInfoWrap": {
          width: "100%",
        },
      },
      ".cronusInfoFooter": {
        width: "100%",
        textAlign: "center",
        left: "0px",
        "> div": {
          display: "block",
          margin: "0px auto !important",
          fontSize: "12px",
        },
      },
    },
  };
});