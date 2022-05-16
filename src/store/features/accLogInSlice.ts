import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface accRegistrationState {
  email: String;
  password: String;
}

const initialState: accRegistrationState = {
  email: '',
  password: ''
};

const accRegistrationSlice = createSlice({
  name: 'accLogIn',
  initialState,
  reducers: {
    updateEmail(state, action: PayloadAction<String>) {
      const st = state;
      const payload = action.payload;
      st.email = payload;
    },
    updatePassword(state, action: PayloadAction<String>) {
      const st = state;
      const payload = action.payload;
      st.password = payload;
    }
  },
});

export const {
  updateEmail,
  updatePassword
} = accRegistrationSlice.actions;

export default accRegistrationSlice.reducer;