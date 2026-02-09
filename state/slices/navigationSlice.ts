import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface NavigationState {
  menuOpen: boolean;
  activeSection: string;
}

const initialState: NavigationState = {
  menuOpen: false,
  activeSection: "hero",
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.menuOpen = action.payload;
    },
    setActiveSection: (state, action: PayloadAction<string>) => {
      state.activeSection = action.payload;
    },
  },
});

export const { setMenuOpen, setActiveSection } = navigationSlice.actions;
export default navigationSlice.reducer;
