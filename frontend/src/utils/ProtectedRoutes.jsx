// Simple Version (No backend verification)
// If you don't want to verify with backend

import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");

  // If no token, redirect to landing page
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // If token exists, show protected content
  return children;
};

export default ProtectedRoute;
