import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const VendorRoute = ({ children }) => {
  const { isAuthenticated, accountType } = useSelector((state) => state.auth);

  if (!isAuthenticated) return <Navigate to="/signin" replace />;
  if (accountType !== 'vendor')
    return <Navigate to="/not-authorized" replace />;

  return children;
};

export default VendorRoute;
