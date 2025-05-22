// src/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token || !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />; // Redirect to login
  }

  return children;
};

export default PrivateRoute;
