// reducers/authReducer.js
const initialState = {
    isLoggedIn: false,
    user: null,
    error: null,
  };
  
  const authReducer = (state = initialState, action:any) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          isLoggedIn: true,
          user: action.payload,
          error: null,
        };
      case 'LOGIN_FAILURE':
        return {
          ...state,
          isLoggedIn: false,
          user: null,
          error: action.payload,
        };
      case 'LOGOUT':
        return initialState;
      default:
        return state;
    }
  };
  
  export default authReducer;


// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { RootState } from './store';

// interface UserState {
//   isLoggedIn: boolean;
//   user: any | null;
//   error: any | null;
// }

// const initialState: UserState = {
//   isLoggedIn: false,
//   user: JSON.parse(localStorage.getItem('user') || 'null'),
//   error: null,
// };
// export const authReducer = (state = initialState, action:any) => {
//   switch (action.type) {
//     case 'LOGIN_SUCCESS':
//       return {
//         ...state,
//         isLoggedIn: true,
//         user: action.payload,
//         error: null,
//       };
//     case 'LOGIN_FAILURE':
//       return {
//         ...state,
//         isLoggedIn: false,
//         user: null,
//         error: action.payload,
//       };
//     case 'LOGOUT':
//       return initialState;
//     default:
//       return state;
//   }
// };


// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     loginSuccess: (state, action: PayloadAction<any>) => {
//       state.isLoggedIn = true;
//       state.user = action.payload;
//       state.error = null;
//       localStorage.setItem('user', JSON.stringify(action.payload));
//     },
//     loginFailure: (state, action: PayloadAction<any>) => {
//       state.isLoggedIn = false;
//       state.user = null;
//       state.error = action.payload;
//       localStorage.removeItem('user');
//     },
//     logout: (state) => {
//       state.isLoggedIn = false;
//       state.user = null;
//       state.error = null;
//       localStorage.removeItem('user');
//     },
//   },
// });

// export const { loginSuccess, loginFailure, logout } = userSlice.actions;
// export const selectUser = (state: RootState) => state.user.user;

// export default userSlice.reducer;
