import { configureStore } from "@reduxjs/toolkit";
import cursorReducer from "./slices/cursorSlice";
import navigationReducer from "./slices/navigationSlice";
import loadingReducer from "./slices/loadingSlice";

export const store = configureStore({
  reducer: {
    cursor: cursorReducer,
    navigation: navigationReducer,
    loading: loadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
