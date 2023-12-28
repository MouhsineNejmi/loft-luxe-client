import { useCookies } from 'react-cookie';
import { Navigate, Outlet } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { useGetCurrentUserQuery } from '@/app/api/usersApi';

type ProtectedRoutesProps = {
  allowedRoles: string[];
};

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ allowedRoles }) => {
  const [cookies] = useCookies(['logged_in']);

  const { data: user, isLoading, isFetching } = useGetCurrentUserQuery();

  const loading = isLoading || isFetching;

  if (loading) {
    return <AiOutlineLoading3Quarters />;
  }

  return (cookies.logged_in || user) &&
    user?.role &&
    allowedRoles.includes(user?.role) ? (
    <Outlet />
  ) : cookies.logged_in && user ? (
    <Navigate to='/unauthorized' />
  ) : (
    <Navigate to='/admin/login' />
  );
};

export default ProtectedRoutes;
