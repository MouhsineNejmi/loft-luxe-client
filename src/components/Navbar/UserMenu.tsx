import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

import Avatar from '@/components/Avatar';
import MenuItem from '@/components/Navbar/MenuItem';

import useRegisterModal from '@/hooks/useRegisterModal';
import useLoginModal from '@/hooks/useLoginModal';
import useRentModal from '@/hooks/useRentModal';

import { IUser } from '@/types/types';
import { useLogoutUserMutation } from '@/app/api/authApi';
import toast from 'react-hot-toast';

interface UserMenuProps {
  currentUser?: IUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const navigate = useNavigate();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const [logoutUser, { isLoading: isLoggingOut, isSuccess }] =
    useLogoutUserMutation();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  });

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  const signOut = async () => {
    await logoutUser();
    toast.success('Logged out Successfully!');
  };

  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div
          className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'
          onClick={onRent}
        >
          LoftLuxe Your Home
        </div>

        <div
          onClick={toggleOpen}
          className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
        >
          <Icon icon='basil:menu-outline' fontSize={18} />
          <div className='hidden md:block'>
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm'>
          {currentUser ? (
            <>
              <MenuItem label='My trips' onClick={() => navigate('/trips')} />
              <MenuItem
                label='My favorites'
                onClick={() => navigate('/favorites')}
              />
              <MenuItem
                label='My reservations'
                onClick={() => navigate('/reservations')}
              />
              <MenuItem
                label='My properties'
                onClick={() => navigate('/properties')}
              />
              <MenuItem label='LoftLuxe your home' onClick={rentModal.onOpen} />
              <hr />
              <MenuItem
                label='Logout'
                onClick={signOut}
                disabled={isLoggingOut}
              />
            </>
          ) : (
            <>
              <MenuItem label='Login' onClick={loginModal.onOpen} />
              <MenuItem label='Sign up' onClick={registerModal.onOpen} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
