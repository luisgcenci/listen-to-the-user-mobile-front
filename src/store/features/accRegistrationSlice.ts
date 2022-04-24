import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface accRegistrationState {
  name: String;
  cpf: String;
  bday: String;
  email: String;
  password: String;
  number: String;
}

const initialState: accRegistrationState = {
  name: '',
  cpf: '',
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
    updateCPF(state, action: PayloadAction<String>) {
      const st = state;
      const payload = action.payload;
      st.cpf = payload;
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
  updateCPF,
  updateBday,
  updateEmail,
  updatePassword,
  updateNumber,
} = accRegistrationSlice.actions;

export default accRegistrationSlice.reducer;