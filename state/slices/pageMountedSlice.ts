import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PageMountedState {
  isPageMounted: boolean;
}

const initialState: PageMountedState = {
  isPageMounted: false,
};

const pageMountedSlice = createSlice({
  name: "pageMounted",
  initialState,
  reducers: {
    setPageMounted: (state, action: PayloadAction<boolean>) => {
      state.isPageMounted = action.payload;
    },
  },
});

export const { setPageMounted } = pageMountedSlice.actions;
export default pageMountedSlice.reducer;
