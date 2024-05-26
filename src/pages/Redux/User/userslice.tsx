import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: any | null; // Replace 'any' with the specific type if you have one
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      // Replace 'any' with the specific type if you have one
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      console.log("User after logout: ", state);
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const selectUser = (state: { user: UserState }) => state.user.user;

export default userSlice.reducer;
