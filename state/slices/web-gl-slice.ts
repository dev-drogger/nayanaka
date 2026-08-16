import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface WebGLState {
  webGLAttached: boolean;
}

const initialState: WebGLState = {
  webGLAttached: false,
};

const webGLSlice = createSlice({
  name: "webGL",
  initialState,
  reducers: {
    attachWebGL: (state, action: PayloadAction<boolean>) => {
      state.webGLAttached = action.payload;
    },
  },
});

export const { attachWebGL } = webGLSlice.actions;
export default webGLSlice.reducer;
