import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { siteMap } from "../routes";
import { persistor, RootState } from "./index";

const SLICE_NAME = "navigationSlice";

type NavigationState = {
  sidebarCollapsed: boolean;
};

const initialState: NavigationState = {
  sidebarCollapsed: true,
};

export const navigationSlice = createSlice({
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

export default navigationSlice.reducer;
export const { openSidebar, closeSidebar } = navigationSlice.actions;
export const selectNavigation = (state: RootState) => state.navigation;
