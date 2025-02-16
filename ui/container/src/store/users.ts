import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit"
import { RootState } from "./index";
import { UserFieldsFragment } from "../types";

import { fetchUsersList } from "../services/users";
const sliceName = "userManagement";

interface UserManagerState {
  usersList: UserFieldsFragment[];
  loading: boolean;
}

const initialState: UserManagerState = {
  usersList: [],
  loading: false,
};

export const getUsersList = createAsyncThunk(
  `${sliceName}/fetchUsersList`,
  async () => {
    return await fetchUsersList();
  }
);

export const userManagementSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(isPending(getUsersList), (state, action) => {
      state.loading = true;
    });
    builder.addMatcher(isRejected(getUsersList), (state, action) => {
      state.loading = false;
    });
    builder.addMatcher(isFulfilled(getUsersList), (state, action) => {
      state.loading = false;
      state.usersList = action.payload;
    });
  },
});

export const {} = userManagementSlice.actions;
export default userManagementSlice.reducer;
export const selectUsersList = (state: RootState) => state.userManagement;
