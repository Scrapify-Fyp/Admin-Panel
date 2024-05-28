// src/pages/Redux/User/userslice.tsx

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store'; // Correctly import RootState

interface UserState {
  user: any | null;  // Define your user state type
}

const initialState: UserState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
