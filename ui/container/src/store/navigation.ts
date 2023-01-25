import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { siteMap } from "../routes";
import { RootState } from "./index";

const SLICE_NAME = "navigationSlice";

type NavigationState = {
  sidebarCollapsed: boolean;
};

const initialState: NavigationState = {
  sidebarCollapsed: false,
};

export const slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    openSidebar(state) {
      state.sidebarCollapsed = true;
    },
    closeSidebar(state) {
      state.sidebarCollapsed = false;
    },
  },
  extraReducers: (builder) => {
  },
});

export default slice.reducer;
export const { openSidebar, closeSidebar } = slice.actions;
export const selectNavigation = (state: RootState) => state.navigation;
