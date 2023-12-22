import LoftLuxeLogo from '@/components/LoftLuxeLogo';
import Search from './Search';
import UserMenu from './UserMenu';

const Navbar = () => {
  return (
    <div className='fixed w-full z-10 border border-b-1'>
      <div className='container py-4'>
        <div className='flex flex-row items-center justify-between gap-3 md-gap-0'>
          <LoftLuxeLogo />
          <Search />
          <UserMenu />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
