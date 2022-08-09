import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface accRegistrationState {
  name: String;
  cpf: String;
  bday: String;
  email: String;
  newPassword: String;
  number: String;
  countryCode: String;
  authProvidersRegistered: Array<String>,
}

const initialState: accRegistrationState = {
  // name: 'Luis Ribeiro',
  // cpf: '079.068.329-65',
  // bday: '18/11/1996',
  // email: 'luisgcenci@gmail.com',
  // newPassword: '123456',
  // number: '5044624982',
  // countryCode: '+1',
  // authProvidersRegistered: []
  name: '',
  cpf: '',
  bday: '',
  email: '',
  newPassword: '',
  number: '',
  countryCode: '',
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
    updateNewPassword(state, action: PayloadAction<String>) {
      const st = state;
      const payload = action.payload;
      st.newPassword = payload;
    },
    updateNumber(state, action: PayloadAction<String>) {
      const st = state;
      const payload = action.payload;
      st.number = payload;
    },
    updateCountryCode(state, action: PayloadAction<String>) {
      const st = state;
      const payload = action.payload;
      st.countryCode = payload;
    }
  },
});

export const {
  updateName,
  updateCPF,
  updateBday,
  updateEmail,
  updateNewPassword,
  updateNumber,
  updateCountryCode,
} = accRegistrationSlice.actions;

export default accRegistrationSlice.reducer;