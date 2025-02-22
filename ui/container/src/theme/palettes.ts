import { cloneDeep } from 'lodash';
import * as animations from './animations';
import { deepmerge } from "@mui/utils";

type ThemeColor = {
  light: string;
  dark: string;
  main: string;
};

export type ColorCollection = { [key: string]: ThemeColor };

const colorCollection: ColorCollection = {
  purple: { light: "#485dc6", dark: "#8095ff", main: "#5a6cdb" },
  red: { light: "#e83c3c", dark: "#d01919", main: "#f44336" },
  orange: { light: "#f2711c", dark: "#f26202", main: "#ff9800" },
  green: { light: "#63ac74", dark: "#3d864e", main: "#4caf50" },
  yellow: { light: "#e8b316", dark: "#daa300", main: "#ffeb3b" },
  lightGrey: { light: "#f6f7fd", dark: "#dbe0e4", main: "#e9eef9" },
  darkGrey: { light: "#d4d6dc", dark: "#4e5983", main: "#868daa" },
  blue: { light: "#8fd1fc", dark: "#0492f2", main: "#41acf5" },
  black: { light: "#282f35", dark: "#151f27", main: "#222e38" },
  default: { light: "#8fd1fc", dark: "#0492f2", main: "#41acf5" },
} as const;

// Define color palettes
export const defaultPallete = {
  mainMiddleColor: "#0492f2",
  backgroundColor: colorCollection.lightGrey.light,
  dashboarContinaerBg: "#f2f3f9",
  borderRadius: "5px",
  colors: colorCollection,
  animations,
  buttons: {
    outlineBg: colorCollection?.lightGrey?.main,
    border: colorCollection?.lightGrey?.dark,
    colors: {
      red: {
        background: colorCollection.red.light,
        hover: colorCollection.red.dark,
      },
      default: {
        background: colorCollection.blue.dark,
        hover: colorCollection.blue.dark,
      },
      orange: {
        background: colorCollection.orange.light,
        hover: colorCollection.orange.dark,
      },
      green: {
        background: colorCollection.green.light,
        hover: colorCollection.green.dark,
      },
      yellow: {
        background: colorCollection.yellow.light,
        hover: colorCollection.yellow.dark,
      },
    },
  },
  header: {
    background: colorCollection.lightGrey.light,
    borderColor: colorCollection.lightGrey.main,
  },
  sideBar:{
    background: "#ffffff",
    borderColor: colorCollection.lightGrey.main,
    activeBackground:  colorCollection.lightGrey.main,
    boxShadow: '0 0 28px 0 rgba(82, 63, 105, 0.2)',
  },
  text:{
    active: colorCollection.blue.main,
    headings: colorCollection.darkGrey.main,
    main: colorCollection.darkGrey.dark,
  }
};

export type ThemeCollectionType = typeof defaultPallete;

export const lightPalette = defaultPallete;

export const darkPalette: ThemeCollectionType = deepmerge(defaultPallete, {
  backgroundColor: colorCollection.black.dark,
  dashboarContinaerBg: "#2f3b46",
  header: {
    background: colorCollection.black.main,
    borderColor: colorCollection.darkGrey.dark,
  },
  sideBar:{
    background: "#364553", //colorCollection.black.light,
    borderColor: colorCollection.darkGrey.dark,
    activeBackground:  colorCollection.black.main,
    boxShadow: '0 0 28px 0 rgb(32 43 52)',
  },
  text:{
    active: colorCollection.blue.main,
    headings: colorCollection.lightGrey.main,
    main: colorCollection.lightGrey.dark,
  },
  buttons:{
    outlineBg: colorCollection.black.dark,
    border: colorCollection.darkGrey.dark,
  },
});
