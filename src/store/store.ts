import { configureStore } from '@reduxjs/toolkit';
import accRegistrationSlice from './features/accRegistrationSlice';
import accLogInSlice from './features/accLogInSlice';
import AuthAppSlice from './features/AuthAppSlice';
import phoneAuthSlice from './features/phoneAuthSlice';
import feedBackSlice from './features/feedBackSlice';
import UserSlice from './features/UserSlice';

export const store = configureStore({
  reducer: {
    phoneAuth: phoneAuthSlice,
    accRegistration: accRegistrationSlice,
    accLogIn: accLogInSlice,
    authApp: AuthAppSlice,
    feedback: feedBackSlice,
    user: UserSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;