import useCountries from '@/hooks/useCountrySelect';
import React from 'react';
import Heading from '../Heading';
import ImageCarousel from '../ImageCarousel';
import HeartButton from '../HeartButton';
import { IUser } from '@/types/types';

type ListingHeadProps = {
  title: string;
  locationValue: string;
  images: string[];
  currentUser?: IUser;
  id: string;
};

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  images,
  currentUser,
  id,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />

      <div className='w-full h-[60vh] overflow-hidden rounded-xl relative'>
        <ImageCarousel images={images} />

        <div className='absolute top-5 right-5'>
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
