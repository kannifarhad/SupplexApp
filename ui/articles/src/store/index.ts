import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const appReducer = combineReducers({
});

const store = configureStore({
  reducer: appReducer
});
export type RootState = ReturnType<typeof appReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;