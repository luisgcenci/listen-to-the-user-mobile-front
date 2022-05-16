import { configureStore } from '@reduxjs/toolkit';
import accRegistrationSlice from './features/accRegistrationSlice';
import accLogInSlice from './features/accLogInSlice';
import AuthAppSlice from './features/AuthAppSlice';
import phoneAuthSlice from './features/phoneAuthSlice';

export const store = configureStore({
  reducer: {
    phoneAuth: phoneAuthSlice,
    accRegistration: accRegistrationSlice,
    accLogIn: accLogInSlice,
    authApp: AuthAppSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;