import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface authAppState {
  registeringAccount: Boolean;
  authStatus: Boolean;
}

const initialState: authAppState = {
  registeringAccount: false,
  authStatus: false,
};

const authAppSlice = createSlice({
  name: 'authApp',
  initialState,
  reducers: {
    updateRegisteringAccount(state, action: PayloadAction<Boolean>) {
      const st = state;
      st.registeringAccount = action.payload;
    },
    updateAuthStatus(state, action: PayloadAction<Boolean>) {
      const st = state;
      st.authStatus = action.payload;
    },
  },
});

export const {
  updateRegisteringAccount,
  updateAuthStatus,
} = authAppSlice.actions;

export default authAppSlice.reducer;