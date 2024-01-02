import React, { useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import useCountries from '@/hooks/useCountrySelect';

import { IListing, IReservation, IUser } from '@/types/types';
import ImageCarousel from '../ImageCarousel';
import HeartButton from '../HeartButton';
import Button from '../Button';

type ListingCardProps = {
  listing: IListing;
  reservation?: IReservation;
  currentUser?: IUser | null;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  onAction?: (id: string) => void;
};

const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  reservation,
  currentUser,
  disabled,
  actionLabel,
  actionId = '',
  onAction,
}) => {
  const navigate = useNavigate();
  const { getByValue } = useCountries();

  const location = getByValue(listing.location);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) return;

      onAction?.(actionId);
    },
    [disabled, actionId, onAction]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return listing.price;
  }, [reservation, listing.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const date = new Date();
    const start = reservation.startDate ? reservation.startDate : date;
    const end = reservation.endDate
      ? reservation.endDate
      : date.setDate(date.getDate() + 1);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  return (
    <div
      onClick={() => navigate(`/listings/${listing.id}`)}
      className='col-span-1 cursor-pointer group'
    >
      <div className='relative'>
        <ImageCarousel images={listing.images} />
        <div className='absolute right-2 top-2'>
          {listing.id && (
            <HeartButton listingId={listing.id} currentUser={currentUser} />
          )}
        </div>
      </div>

      <h3 className='font-semibold text-sm text-lg mt-2 mb-1'>
        {location?.region}, {location?.label}
      </h3>

      <p className='font-light text-sm text-neutral-600 mb-1'>
        {reservationDate || listing.category}
      </p>

      <div className='flex flex-row items-center gap-1 mb-1'>
        <h3 className='font-semibold text-sm'>$ {price}</h3>
        {!reservation && <p className='font-light text-sm'>/night</p>}
      </div>

      {onAction && actionLabel && (
        <Button
          disabled={disabled}
          outline
          label={actionLabel}
          onClick={handleCancel}
        />
      )}
    </div>
  );
};

export default ListingCard;
