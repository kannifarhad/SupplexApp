import { createTheme, Theme } from "@mui/material/styles";
import { lightPalette, darkPalette, ThemeCollectionType } from './palettes';

// Extend MUI's Theme to include custom colors
declare module "@mui/material/styles" {
  interface Theme {
    customStyles: ThemeCollectionType;
  }

  interface ThemeOptions {
    customStyles?: ThemeCollectionType;
  }
}

// Define shared typography
const typography = {
  fontFamily: "'Montserrat' !important",
  fontSize: 14,
  h1: { fontSize: "1.45em", fontWeight: 600 },
  h2: { fontSize: "1.2em" },
  body1: { fontSize: "0.9em" },
  body2: { fontSize: "0.75em" },
};

// Create themes
export const lightTheme: Theme = createTheme({
  typography,
  palette: {
    mode: "light",
    primary: { main: lightPalette.mainMiddleColor },
    background: { default: lightPalette.backgroundColor },
  },
  components:{
    MuiButton:{
      styleOverrides:{
        root:{
          cursor: "pointer"
        },
        outlined:{
          borderColor: lightPalette.colors.default.light,
          backgroundColor: lightPalette.backgroundColor,
        },
      },
    }
  },
  customStyles: lightPalette,
});

export const darkTheme: Theme = createTheme({
  typography,
  palette: {
    mode: "dark",
    primary: { main: darkPalette.mainMiddleColor },
    background: { default: darkPalette.backgroundColor },
  },
  customStyles: darkPalette,
});