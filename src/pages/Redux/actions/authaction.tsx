// actions/authActions.js
export const loginSuccess = (user:any) => ({
    type: 'LOGIN_SUCCESS',
    payload: user,
  });
  
  export const loginFailure = (error:any) => ({
    type: 'LOGIN_FAILURE',
    payload: error,
  });
  
  export const logout = () => ({
    type: 'LOGOUT',
  });
  