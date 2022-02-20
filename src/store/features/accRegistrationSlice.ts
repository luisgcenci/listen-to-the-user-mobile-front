import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface accRegistrationState {
  name: String;
  bday: String;
  email: String;
  password: String;
  number: String;
}

const initialState: accRegistrationState = {
  name: '',
  bday: '',
  email: '',
  password: '',
  number: '',
};

const phoneAuthSlice = createSlice({
  name: 'accRegistration',
  initialState,
  reducers: {

    registerAccount(state, action: PayloadAction<Array<String>>) {
      const st = state;
      const payload = action.payload;
      st.name = payload['name'];
      st.bday = payload['bday'];
      st.email = payload['email'];
      st.password = payload['password'];
    },
    registerNumber(state, action: PayloadAction<String>) {
      const st = state;
      const payload = action.payload;
      st.number = payload;
    },
  },
});

export const {
  registerAccount,
  registerNumber
} = phoneAuthSlice.actions;

export default phoneAuthSlice.reducer;