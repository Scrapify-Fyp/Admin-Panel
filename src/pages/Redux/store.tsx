
import { configureStore } from '@reduxjs/toolkit';
import  authReducer  from './authSlice';

const store = configureStore({
  reducer: {
    user: authReducer,  // Ensure this matches the slice name
  },
  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
