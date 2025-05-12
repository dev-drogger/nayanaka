import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ViewState {
  isInView: boolean;
}

const initialState: ViewState = {
  isInView: false,
};

const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    setInView: (state, action: PayloadAction<boolean>) => {
      state.isInView = action.payload;
    },
  },
});

export const { setInView } = viewSlice.actions;
export default viewSlice.reducer;
