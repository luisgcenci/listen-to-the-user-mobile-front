import { configureStore } from '@reduxjs/toolkit';
import accRegistrationSlice from './features/accRegistrationSlice';
import phoneAuthSlice from './features/phoneAuthSlice';

export const store = configureStore({
  reducer: {
    phoneAuth: phoneAuthSlice,
    accRegistration: accRegistrationSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;