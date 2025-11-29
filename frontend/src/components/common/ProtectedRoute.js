import React from "react";
import { Navigate } from "react-router-dom";

// utils/auth.js'den rol kontrolü
const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  return user?.role || null;
};

const ProtectedRoute = ({ allowedRoles, children }) => {
  const role = getUserRole();

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute; // default export!
