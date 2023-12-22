import { useCallback, useState } from 'react';
import { Icon } from '@iconify/react';
import Avatar from '@/components/Avatar';
import MenuItem from './MenuItem';
import useRegisterModal from '@/hooks/useRegisterModal';

const UserMenu = () => {
  const registerModal = useRegisterModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <h3
          className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'
          onClick={() => {}}
        >
          Airbnb Your Home
        </h3>

        <div
          onClick={toggleOpen}
          className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
        >
          <Icon icon='basil:menu-outline' fontSize={18} />
          <div className='hidden md:block'>
            <Avatar />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className='
          absolute 
          rounded-xl 
          shadow-md
          w-[40vw]
          md:w-3/4 
          bg-white 
          overflow-hidden 
          right-0 
          top-12 
          text-sm
        '
        >
          <MenuItem label='Login' onClick={() => {}} />
          <MenuItem label='Sign up' onClick={registerModal.onOpen} />
        </div>
      )}
    </div>
  );
};

export default UserMenu;
