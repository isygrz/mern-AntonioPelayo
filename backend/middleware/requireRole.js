export const requireRole = (roleOrRoles) => (req, res, next) => {
  const roles = Array.isArray(roleOrRoles) ? roleOrRoles : [roleOrRoles];
  const userRole = req.user?.role || 'guest';
  if (roles.includes(userRole)) return next();
  return res.status(403).json({ message: 'Forbidden' });
};
