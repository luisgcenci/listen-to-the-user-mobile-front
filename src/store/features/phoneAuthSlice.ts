import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface phoneAuthState {
  verificationId: Number;
}

const initialState: phoneAuthState = {
  verificationId: 0,
};

const phoneAuthSlice = createSlice({
  name: 'number',
  initialState,
  reducers: {
    updateVerificationId(state, action: PayloadAction<Number>) {
      const st = state;
      st.verificationId = action.payload;
    }
  },
});

export const {
  updateVerificationId,
} = phoneAuthSlice.actions;

export default phoneAuthSlice.reducer;