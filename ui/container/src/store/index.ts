import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import { resetToken } from "../utils";
import auth, { authSlice } from "./auth";
import userManagement from "./users";
import error from "./error";
import dashboard, {dashboardSlice}  from "./dashboard";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: [authSlice.name, dashboardSlice.name],
  stateReconciler: autoMergeLevel2,
};

const appReducer = combineReducers({
  auth,
  error,
  dashboard,
  userManagement
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "RESET_ALL") {
    resetToken();
    // for all keys defined in the persistConfig(s)
    storage.removeItem("persist:root");
    storage.removeItem("nextSystemAlert");
    state = action.keepAlerts
      ? { systemAlerts: state.systemAlerts }
      : undefined;
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
export type RootState = ReturnType<typeof appReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;