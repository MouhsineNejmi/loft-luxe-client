import { Icon } from '@iconify/react';

const Search = () => {
  return (
    <div className='border md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer'>
      <div className='flex flex-row items-center justify-between'>
        <div className='text-sm font-semibold px-4'>Anywhere</div>
        <div className='hidden sm:block text-sm font-semibold px-4 border-x-[1px] flex-1 text-center'>
          Any Week
        </div>
        <div className='text-sm pl-4 pr-2 flex flex-row items-center gap-3'>
          <div className='hidden sm:block'>Add Guests</div>
          <div className='p-2 bg-crayola text-white rounded-full'>
            <Icon icon='ion:search-outline' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
