import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface authAppState {
  registeringAccount: Boolean;
  authStatus: Boolean;
  userInfo: String;
}

const initialState: authAppState = {
  registeringAccount: false,
  authStatus: false,
  userInfo: ''
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
    updateUserInfo(state, action: PayloadAction<String>) {
      const st = state;
      st.userInfo = action.payload;
    }
  },
});

export const {
  updateRegisteringAccount,
  updateAuthStatus,
  updateUserInfo
} = authAppSlice.actions;

export default authAppSlice.reducer;