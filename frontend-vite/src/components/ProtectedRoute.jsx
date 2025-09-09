import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * Usage (React Router v6):
 * <Route
 *   path="/admin"
 *   element={<ProtectedRoute roles={['admin']} element={<AdminScreen />} />}
 * />
 */
export default function ProtectedRoute({ roles, element }) {
  const location = useLocation();
  const { user, token } = useSelector(
    (s) => s.auth || { user: null, token: null }
  );

  // Not logged in
  if (!token || !user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // If roles specified, enforce
  if (Array.isArray(roles) && roles.length > 0) {
    const role = user.role || user?.roles?.[0];
    const allowed = roles.includes(role);
    if (!allowed) {
      // Send to a Not Authorized or 404 route as desired
      return <Navigate to="/404" replace />;
    }
  }

  // Authorized
  return element;
}
