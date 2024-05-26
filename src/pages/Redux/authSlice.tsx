// authreducer.tsx
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface AuthState {
  isLoggedIn: boolean;
  user: any;
  error: any;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<any>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.error = null;
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<any>) => {
      state.isLoggedIn = false;
      state.error = action.payload;
    },
  },
});

export const { loginSuccess, logoutSuccess, loginFailure } = authSlice.actions;

// Selector function to select user from state
export const selectUser = createSelector(
  (state: RootState) => state.auth.user,
  (user) => user
);

export default authSlice.reducer;
