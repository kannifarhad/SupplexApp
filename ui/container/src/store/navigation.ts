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
      state.sidebarCollapsed = false;
    },
    closeSidebar(state) {
      state.sidebarCollapsed = true;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(sampleAction.pending, (state, action) => {
    //     // state.loading = true;
    // });
  },
});

export default slice.reducer;
export const { openSidebar, closeSidebar } = slice.actions;
export const selectNavigation = (state: RootState) => state.navigation;
