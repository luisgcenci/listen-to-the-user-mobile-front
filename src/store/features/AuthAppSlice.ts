import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface authAppState {
  authStatus: Boolean;
}

const initialState: authAppState = {
  authStatus: false,
};

const authAppSlice = createSlice({
  name: 'authApp',
  initialState,
  reducers: {
    updateAuthStatus(state, action: PayloadAction<Boolean>) {
      const st = state;
      st.authStatus = action.payload;
    },
  },
});

export const {
  updateAuthStatus,
} = authAppSlice.actions;

export default authAppSlice.reducer;