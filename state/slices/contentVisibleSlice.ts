import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ContentVisibleState {
  isContentVisible: boolean;
}

const initialState: ContentVisibleState = {
  isContentVisible: false,
};

const contentVisibleSlice = createSlice({
  name: "contentVisible",
  initialState,
  reducers: {
    setContentVisible: (state, action: PayloadAction<boolean>) => {
      state.isContentVisible = action.payload;
    },
  },
});

export const { setContentVisible } = contentVisibleSlice.actions;
export default contentVisibleSlice.reducer;
