import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "./auth";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = auth();
//   const navigate = useNavigate();
console.log("i a user",user);

  if (!user) {
    
    return <Navigate to="/" replace />;
  } else {
    return <>{children}</>;
  }
};

export default ProtectedRoute;
