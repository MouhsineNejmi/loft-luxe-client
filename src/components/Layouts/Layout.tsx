import { Outlet } from 'react-router-dom';

import Navbar from '@/components/Navbar/Navbar';
import RegisterModal from '@/components/Modals/RegisterModal';
import LoginModal from '@/components/Modals/LoginModal';
import RentModal from '../Modals/RentModal';

import { useGetCurrentUserQuery } from '@/app/api/usersApi';

const Layout = () => {
  const { data: user } = useGetCurrentUserQuery();

  return (
    <div>
      <Navbar currentUser={user} />
      <RegisterModal />
      <LoginModal />
      <RentModal />
      <>
        <Outlet />
      </>
    </div>
  );
};
export default Layout;
