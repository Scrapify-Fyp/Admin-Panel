// import React from "react";
// // import jwt from 'jsonwebtoken'
// import { jwtDecode } from "jwt-decode";

// export const auth = () => {
//   // const dispath = useDispatch();

//   const cookieObject = Object.fromEntries(
//     document.cookie.split("; ").map((cookie) => {
//       const [key, value] = cookie.split("=");
//       return [key, value];
//     })
//   );

//   const token = cookieObject["token"];

//   // const token = jst.get('token');
//   console.log("🚀 ~ auth ~ token:", token);

//   const { user } = jwtDecode(token);
//   console.log("🚀 ~ auth ~ user:", user);

//   // dispath(setUser(user));

//   return user;
// };

// auth.js


// import {jwtDecode} from "jwt-decode";
// import { useSelector} from "react-redux";
// import { RootState } from "./Redux/store";
// export const auth = () => {
//   try {
//     const cookieObject = Object.fromEntries(
//       document.cookie.split("; ").map((cookie) => {
//         const [key, value] = cookie.split("=");
//         return [key, value];
//       })
//     );

//     const token = cookieObject["token"];
//     if (!token) {
//       throw new Error("No token found in cookies");
//     }

//     // const decodedToken = jwtDecode(token);
//     // const  user  = decodedToken;
//     const user = useSelector((state: RootState) => state.auth.user); // Access user from Redux

// console.log("i am aaaa",user);

//     // // Dispatch action to set authenticated user in Redux state
//     // const dispatch = useDispatch();
//     // dispatch(setUser(user));

//     return user;
//   } catch (error:any) {
//     console.error("Authentication error:", error.message);
//     return null; // Return null or handle error as needed
//   }
// };

// // export default auth;
// src/pages/auth.tsx

// src/pages/auth.tsx

import { useSelector } from 'react-redux';
import { RootState } from './Redux/store';

export const useAuth = () => {
  const user = useSelector((state: RootState) => state.user.user);
  console.log("hehehehhe....",user);
  
  return user;
};



