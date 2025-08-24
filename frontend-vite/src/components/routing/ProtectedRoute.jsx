import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * ProtectedRoute (unified, role + permission aware)
 *
 * Props:
 * - requireRole: string | string[]  (e.g., "admin" or ["admin","vendor"])
 * - requirePerm: string | string[]  (e.g., "admin:all" or ["products:write","blogs:write"])
 *
 * Auth passes if:
 *   1) User is authenticated (Redux) OR we have a user object (rehydrated), AND
 *   2) (if present) user.approved !== false, AND
 *   3) (if present) user's role is in requireRole, AND
 *   4) (if present) user's permissions include requirePerm (all of them if array).
 */
const normalizeRole = (user) =>
  user?.role || (user?.isAdmin ? 'admin' : user?.accountType || 'guest');

const isApproved = (user) => {
  if (typeof user?.approved === 'boolean') return user.approved;
  return true; // default legacy behavior
};

const hasRequiredRole = (user, requireRole) => {
  if (!requireRole) return true;
  const role = normalizeRole(user);
  if (Array.isArray(requireRole)) return requireRole.includes(role);
  return role === requireRole;
};

const hasRequiredPerms = (user, requirePerm) => {
  if (!requirePerm) return true;
  const perms = user?.permissions || [];
  if (Array.isArray(requirePerm)) {
    return requirePerm.every((p) => perms.includes(p));
  }
  return perms.includes(requirePerm);
};

const ProtectedRoute = ({ requireRole, requirePerm }) => {
  const auth = useSelector((s) => s.auth || {});
  const user = auth?.userInfo;
  const location = useLocation();

  const authed = !!auth?.isAuthenticated || !!user;
  const approved = user ? isApproved(user) : false;
  const roleOk = hasRequiredRole(user, requireRole);
  const permOk = hasRequiredPerms(user, requirePerm);

  if (!authed || !approved || !roleOk || !permOk) {
    return <Navigate to="/email-check" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
