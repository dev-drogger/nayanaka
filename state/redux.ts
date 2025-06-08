import { configureStore } from "@reduxjs/toolkit";
import cursorReducer from "./slices/cursorSlice";
import navigationReducer from "./slices/navigationSlice";
import loadingReducer from "./slices/loadingSlice";
import viewReducer from "./slices/viewSlice";
import contentVisibleReducer from "./slices/contentVisibleSlice";
import pageMountedReducer from "./slices/pageMountedSlice";

export const store = configureStore({
  reducer: {
    cursor: cursorReducer,
    navigation: navigationReducer,
    loading: loadingReducer,
    view: viewReducer,
    contentVisible: contentVisibleReducer,
    pageMounted: pageMountedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
