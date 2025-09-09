import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * ProtectedRoute (RBAC-aware)
 *
 * Props:
 * - requireRole | roles : string | string[]   // allowed roles (alias: roles)
 * - requirePerm         : string | string[]   // required permission(s)
 * - fallback            : string              // optional override for unauthorized redirect
 *
 * Redirect rules:
 *  1) Not authenticated  -> /signin (preserve 'from')
 *  2) Auth'd vendor not approved -> /thank-you-awaiting-approval
 *  3) Auth'd but lacks role/perm -> /not-authorized  (404-style page per project choice)
 */
const normalizeRole = (user) =>
  user?.role || (user?.isAdmin ? 'admin' : user?.accountType || 'guest');

const isApproved = (user) => {
  if (typeof user?.approved === 'boolean') return user.approved;
  return true; // default legacy behavior
};

const hasRequiredRole = (user, required) => {
  if (!required) return true;
  const role = normalizeRole(user);
  const list = Array.isArray(required) ? required : [required];
  return list.includes(role);
};

const hasRequiredPerms = (user, required) => {
  if (!required) return true;
  const userPerms = user?.permissions || [];
  const list = Array.isArray(required) ? required : [required];
  return list.every((p) => userPerms.includes(p));
};

const ProtectedRoute = (props) => {
  const { requireRole, roles, requirePerm, fallback } = props;
  const requiredRoles = roles ?? requireRole; // support both prop names for compatibility
  const auth = useSelector((s) => s.auth || {});
  const user = auth?.userInfo;
  const location = useLocation();

  const authed = Boolean(auth?.isAuthenticated || user);

  // 1) Not authenticated
  if (!authed) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // 2) Vendor approval gate
  if (normalizeRole(user) === 'vendor' && !isApproved(user)) {
    return <Navigate to="/thank-you-awaiting-approval" replace />;
  }

  // 3) Role/perm checks
  const roleOk = hasRequiredRole(user, requiredRoles);
  const permOk = hasRequiredPerms(user, requirePerm);
  if (!roleOk || !permOk) {
    return (
      <Navigate
        to={fallback || '/not-authorized'}
        state={{ from: location }}
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
