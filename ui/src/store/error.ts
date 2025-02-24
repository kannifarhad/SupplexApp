import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GraphQLErrorExtensions } from "graphql";
import { RootState } from "./index";

const SLICE_NAME = "error";


type ErrorSlice = {
  errorType?: "FORBIDDEN" | "";
  errorSection?: string;
  errorContent?: GraphQLErrorExtensions
};

const initialState: ErrorSlice = {
  errorType: ""
};

export const slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setError: (
      state, 
      action:PayloadAction<ErrorSlice>
      )  => {
      state.errorType = action.payload.errorType;
      state.errorContent = action.payload.errorContent;
      state.errorSection = action.payload.errorSection;
    },
    cleanError: (state) => {
      return initialState;
    },
  }
});

export default slice.reducer;
export const {
  setError,
  cleanError,
} = slice.actions;
export const selectErrorSlice = (state: RootState) => {
  return state.error;
};
