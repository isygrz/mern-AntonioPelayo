import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo && userInfo.approved ? (
    <Outlet />
  ) : (
    <Navigate to="/email-check" replace />
  );
};

export default ProtectedRoute;
