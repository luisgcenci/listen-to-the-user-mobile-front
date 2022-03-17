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

const accRegistrationSlice = createSlice({
  name: 'accRegistration',
  initialState,
  reducers: {
    updateName(state, action: PayloadAction<String>) {
      const st = state;
      const payload = action.payload;
      st.name = payload;
    },
    updateBday(state, action: PayloadAction<String>) {
      const st = state;
      const payload = action.payload;
      st.bday = payload;
    },
    updateEmail(state, action: PayloadAction<String>) {
      const st = state;
      const payload = action.payload;
      st.email = payload;
    },
    updatePassword(state, action: PayloadAction<String>) {
      const st = state;
      const payload = action.payload;
      st.password = payload;
    },
    updateNumber(state, action: PayloadAction<String>) {
      const st = state;
      const payload = action.payload;
      st.number = payload;
    },
  },
});

export const {
  updateName,
  updateBday,
  updateEmail,
  updatePassword,
  updateNumber,
} = accRegistrationSlice.actions;

export default accRegistrationSlice.reducer;