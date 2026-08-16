import { configureStore } from "@reduxjs/toolkit";
import cursorReducer from "./slices/cursorSlice";
import webGLReducer from "./slices/web-gl-slice";
import loadingReducer from "./slices/loadingSlice";

export const store = configureStore({
  reducer: {
    cursor: cursorReducer,
    webGL: webGLReducer,
    loading: loadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
