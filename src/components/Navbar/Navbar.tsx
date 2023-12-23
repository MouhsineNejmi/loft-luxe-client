import LoftLuxeLogo from '@/components/LoftLuxeLogo';
import Search from './Search';
import UserMenu from './UserMenu';
import { IUser } from '@/types/types';
import Categories from './Categories';

interface UserMenuProps {
  currentUser?: IUser | null;
}

const Navbar: React.FC<UserMenuProps> = ({ currentUser }) => {
  return (
    <div className='w-full z-10'>
      <div className='py-4 border-b'>
        <div className='container flex flex-row items-center justify-between gap-3 md-gap-0'>
          <LoftLuxeLogo />
          <Search />
          <UserMenu currentUser={currentUser} />
        </div>
      </div>

      <Categories />
    </div>
  );
};

export default Navbar;
