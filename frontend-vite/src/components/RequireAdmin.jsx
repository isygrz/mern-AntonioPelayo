import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * Simple admin guard.
 * Assumes auth slice exposes state.auth.user with isAdmin boolean.
 */
export default function RequireAdmin({ children }) {
  const { user } = useSelector((s) => s.auth || {});
  const location = useLocation();
  if (!user)
    return <Navigate to="/signin" state={{ from: location }} replace />;
  if (!user.isAdmin) return <Navigate to="/my-account/dashboard" replace />;
  return children;
}
