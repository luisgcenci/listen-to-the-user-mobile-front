import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface authAppState {
  registeringAccount: Boolean;
}

const initialState: authAppState = {
  registeringAccount: false,
};

const authAppSlice = createSlice({
  name: 'authApp',
  initialState,
  reducers: {
    updateRegisteringAccount(state, action: PayloadAction<Boolean>) {
      const st = state;
      st.registeringAccount = action.payload;
    }
  },
});

export const {
  updateRegisteringAccount,
} = authAppSlice.actions;

export default authAppSlice.reducer;