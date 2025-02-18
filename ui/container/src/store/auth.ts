import {
  createAsyncThunk,
  createSlice,
  Dispatch,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import client from "../services/clients/apolloClient";
import { persistor, RootState } from "./index";
import { setToken, resetToken } from "../utils";
import { LAST_LOCATION_KEY } from "../constants";
import { LOGIN, LOGOUT, } from "../services/graphql";
import { UserRole, LoginMutation, LoginMutationVariables, UserFieldsFragment } from "../types";
// import { UserFields } from "../types";

interface AuthState {
  user: UserFieldsFragment | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
};

export const loginWithCredentials = createAsyncThunk(
  "auth/loginWithCredentials",
  async (variables: LoginMutationVariables) => {
    const { data } = await client.mutate<LoginMutation>({
      mutation: LOGIN,
      variables,
    });
    return data!.login;
  }
);


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isPending(loginWithCredentials),
      (state, action) => {
        // state.loading = true;
      }
    );
    builder.addMatcher(
      isRejected(loginWithCredentials),
      (state, action) => {
        state.loading = false;
      }
    );
    builder.addMatcher(
      isFulfilled(loginWithCredentials),
      (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        setToken(action.payload.token!);
      }
    );
    
  },
});

// /**
//  * Logging out user logic. Removes all variables from localstorage and cleans redux store
//  * @param keepAlerts optional boolean param. If you send it true resetting of store will wipe all data besides system Alerts. Otherwise all store data will be removed..
//  * @returns void
//  */
export const logout = ( keepAlerts?: boolean, keepLastLocation?: boolean ) => async (dispatch: Dispatch) => {
  await client.mutate({ mutation: LOGOUT, }).catch(console.error);
  await persistor.purge();
  dispatch({ type: "RESET_ALL", keepAlerts });
  resetToken()
  if(!keepLastLocation) window.localStorage.removeItem(LAST_LOCATION_KEY);
};


export const {} = authSlice.actions;
export default authSlice.reducer;
export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const isAdmin = (state: RootState) => state.auth.user?.role === UserRole.ADMIN;
