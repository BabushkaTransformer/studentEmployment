import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const RequireAuth = ({ allowedRoles }) => {
  const { user } = useSelector(state => state.auth);
  const location = useLocation();

  return (
    allowedRoles.find(role => role.includes(user?.role))
      ? <Outlet/>
      : <Navigate to="/" state={{ from: location }} replace/>
  );
};
