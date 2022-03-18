import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface phoneAuthState {
  phoneNumber: Number;
  verificationId: Number;
  verificationCode: Number;
}

const initialState: phoneAuthState = {
  phoneNumber: 0,
  verificationId: 0,
  verificationCode: 0,
};

const phoneAuthSlice = createSlice({
  name: 'number',
  initialState,
  reducers: {
    updatePhoneNumber(state, action: PayloadAction<Number>) {
      const st = state;
      st.phoneNumber = action.payload;
    },
    clearPhoneNumber(state){
      const st = state;
      st.phoneNumber = 0;
    },
    updateVerificationId(state, action: PayloadAction<Number>) {
      const st = state;
      st.verificationId = action.payload;
    },
    updateVerificationCode(state, action: PayloadAction<Number>) {
      const st = state;
      st.verificationCode = action.payload;
    }
  },
});

export const {
  updatePhoneNumber,
  clearPhoneNumber,
  updateVerificationId,
  updateVerificationCode,
} = phoneAuthSlice.actions;

export default phoneAuthSlice.reducer;