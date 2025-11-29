// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

/*
  ProtectedRoute
  - Uses localStorage 'role' which is set on login/register in the app
  - If you prefer to fetch the current user from the server, replace getUserRole()
    with an async call to getCurrentUser() from services/api and show a loader.
*/

const getUserRole = () => {
  // Read the role the login/register stores (string like "user" | "provider" | "admin")
  const roleFromLS = localStorage.getItem("role");
  if (roleFromLS) return roleFromLS;
  // Backward compatibility: if you store a full 'user' object
  try {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return user?.role || null;
  } catch {
    return null;
  }
};

const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const role = getUserRole();

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
