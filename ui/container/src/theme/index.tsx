import React, { useContext, useMemo } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./themes";
import { selectTheme } from "src/store/dashboard";
import { useSelector } from "react-redux";

const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const;

export type ThemeTypes = keyof typeof themes;

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const themeName = useSelector(selectTheme);

  const theme = useMemo(() => themes[themeName] || lightTheme, [themeName]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
