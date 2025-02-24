import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit"
import { RootState } from "./index";
import { UserFieldsFragment } from "../types";

import { fetchUsersList, deleteUsersById } from "../services/users";
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

export const requestDeleteUserById = createAsyncThunk(
  `${sliceName}/deleteUsersById`,
  async (id: string) => {
    return await deleteUsersById(id);
  }
);

export const userManagementSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(isPending(requestDeleteUserById), (state, action) => {
      state.loading = true;
    });

    builder.addMatcher(isRejected(requestDeleteUserById), (state, action) => {
      state.loading = false;
    });

    builder.addMatcher(isFulfilled(requestDeleteUserById), (state, action) => {
      state.loading = false;
      state.usersList = state.usersList.filter((user)=> user.id !== action.payload.id);
    });
    
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
