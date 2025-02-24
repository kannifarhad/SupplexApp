import { createSlice } from "@reduxjs/toolkit";
import {  RootState } from "./index";
import { ThemeTypes } from "src/theme";

const SLICE_NAME = "dashboard";

type DashboardState = {
  sidebarCollapsed: boolean;
  theme: ThemeTypes;
};

const initialState: DashboardState = {
  sidebarCollapsed: true,
  theme: "light",
};

export const dashboardSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    openSidebar(state) {
      state.sidebarCollapsed = true;
    },
    closeSidebar(state) {
      state.sidebarCollapsed = false;
    },
    setTheme(state, action) {
      state.theme = action.payload;
    },
  },
  extraReducers: (builder) => {
  },
});

export default dashboardSlice.reducer;
export const { openSidebar, closeSidebar, setTheme } = dashboardSlice.actions;
export const selectSideBar = (state: RootState) => state.dashboard.sidebarCollapsed;
export const selectTheme = (state: RootState) => state.dashboard.theme;
