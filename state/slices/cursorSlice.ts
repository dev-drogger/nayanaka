import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CursorState {
  type: string;
  mouseSpeed: number;
}

const initialState: CursorState = {
  type: "default",
  mouseSpeed: 0,
};

const cursorSlice = createSlice({
  name: "cursor",
  initialState,
  reducers: {
    setCursorType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    setMouseSpeed: (state, action: PayloadAction<number>) => {
      state.mouseSpeed = action.payload;
    },
  },
});

export const { setCursorType, setMouseSpeed } = cursorSlice.actions;
export default cursorSlice.reducer;
