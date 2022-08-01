import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Appearance } from 'react-native'

interface userState {
  darkMode: Boolean;
}

const initialState: userState = {
  darkMode: Appearance.getColorScheme() === 'dark',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateDarkMode(state, action: PayloadAction<Boolean>) {
      const st = state;
      st.darkMode = action.payload;
    },
  },
});

export const {
    updateDarkMode,
} = userSlice.actions;

export default userSlice.reducer;