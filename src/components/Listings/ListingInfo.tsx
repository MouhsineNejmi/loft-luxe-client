import React, { Suspense, lazy, useMemo } from 'react';
import useCountries from '@/hooks/useCountrySelect';

import { Category, IUser } from '@/types/types';

import Avatar from '../Avatar';
import ListingCategory from './ListingCategory';
import MapsLoading from '../Skeletons/MapsLoading';

type ListingInfoProps = {
  user: IUser;
  category: Category | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  location: string;
};

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  location,
}) => {
  const Maps = useMemo(() => lazy(() => import('@/components/Maps')), []);
  const { getByValue } = useCountries();

  const coordinates = getByValue(location);

  return (
    <div className='col-span-4 flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <div className='font-semibold flex flex-row items-center gap-2 text-lg'>
          <h4 className=''>Hosted By {user?.username}</h4>
          <Avatar src={user?.image} />
        </div>

        <div className='flex flex-row items-center gap-4 font-light text-sm text-neutral-500'>
          <p>{guestCount} guests</p>
          <p>{roomCount} rooms</p>
          <p>{bathroomCount} bathrooms</p>
        </div>
      </div>

      <hr />

      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}

      <hr />

      <p className='text-md font-light text-neutral-500'>{description}</p>

      <hr />
      <Suspense fallback={<MapsLoading />}>
        <Maps center={coordinates?.latlng} />
      </Suspense>
    </div>
  );
};

export default ListingInfo;
