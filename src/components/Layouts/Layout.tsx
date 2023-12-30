import { Outlet, useLocation } from 'react-router-dom';

import Navbar from '@/components/Navbar/Navbar';
import RegisterModal from '@/components/Modals/RegisterModal';
import LoginModal from '@/components/Modals/LoginModal';
import RentModal from '../Modals/RentModal';

import { useGetCurrentUserQuery } from '@/app/api/usersApi';

const Layout = () => {
  const { data: user } = useGetCurrentUserQuery();

  const { pathname } = useLocation();
  const isMainPage = pathname === '/';

  return (
    <div>
      <Navbar currentUser={user} />
      <RegisterModal />
      <LoginModal />
      <RentModal />
      <div className={`${isMainPage ? 'pt-48' : 'pt-24'} pb-20`}>
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
