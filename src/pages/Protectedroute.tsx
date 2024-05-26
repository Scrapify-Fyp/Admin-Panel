// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { RootState } from './Redux/store';

// interface ProtectedRouteProps {
//   element: React.ReactNode;
//   path: string;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, path }) => {
//   const auth = useSelector((state: RootState) => state.auth);

//   return auth.isLoggedIn ? (
//     <Route path={path} element={element} />
//   ) : (
//     <Navigate to="/admin/login" replace />
//   );
// };

// export default ProtectedRoute;
