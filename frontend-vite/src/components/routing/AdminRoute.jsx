import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo?.accountType === 'admin' ? (
    <Outlet />
  ) : (
    <Navigate to="/not-authorized" replace />
  );
};

export default AdminRoute;
