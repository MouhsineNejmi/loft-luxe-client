import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { differenceInDays, eachDayOfInterval } from 'date-fns';
import { Range } from 'react-date-range';
import toast from 'react-hot-toast';

import { useGetListingByIdQuery } from '@/app/api/listingsApi';
import { useGetCurrentUserQuery } from '@/app/api/usersApi';
import {
  useCreateReservationMutation,
  useGetReservationsQuery,
} from '@/app/api/reservationsApi';

import categories from '@/data/categories';
import useLoginModal from '@/hooks/useLoginModal';

import EmptyState from '@/components/EmptyState';
import ListingPageSkeleton from '@/components/Skeletons/ListingPageSkeleton';
import ListingHead from '@/components/Listings/ListingHead';
import ListingInfo from '@/components/Listings/ListingInfo';
import ListingReservation from '@/components/Listings/ListingReservation';
import { IReservation } from '@/types/types';

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};

const ListingPage = () => {
  const { listingId } = useParams();
  const loginModal = useLoginModal();

  const { data: listing, isLoading: isLoadingListingData } =
    useGetListingByIdQuery(listingId!);
  const { data: user } = useGetCurrentUserQuery();
  const { data: reservations } = useGetReservationsQuery({ listingId });

  const [createReservation, { isLoading: isCreatingReservation }] =
    useCreateReservationMutation();

  const category = useMemo(() => {
    return categories.find((category) => category.label === listing?.category);
  }, [listing?.category]);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    const date = new Date();

    reservations?.map((reservation: IReservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate ? reservation.startDate : date),
        end: new Date(
          reservation.endDate
            ? reservation.endDate
            : date.setDate(date.getDate() + 1)
        ),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const [totalPrice, setTotalPrice] = useState(listing?.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(async () => {
    if (!user) {
      return loginModal.onOpen();
    }

    try {
      await createReservation({
        userId: user.id,
        totalPrice: totalPrice!,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      });

      toast.success('Property Reserved Successfully!');
      setDateRange(initialDateRange);
      // Redirect to trips
    } catch (err) {
      toast.error('Somthing went wrong');
    }
  }, [dateRange, listing?.id, loginModal, totalPrice, user, createReservation]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = Math.abs(
        differenceInDays(dateRange.startDate, dateRange.endDate)
      );

      if (dayCount && listing?.price) {
        setTotalPrice(dayCount * listing?.price);
      } else {
        setTotalPrice(listing?.price);
      }
    }
  }, [dateRange, listing?.price]);

  return isLoadingListingData ? (
    <ListingPageSkeleton />
  ) : !listing ? (
    <EmptyState />
  ) : (
    <div className='container'>
      <div className='max-w-screen-lg mx-auto'>
        <div className='flex flex-col gap-6'>
          <ListingHead
            title={listing.title}
            images={listing.images}
            locationValue={listing.location}
            currentUser={user}
            id={listing.id!}
          />

          <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              location={listing.location}
            />

            <div className='order-first mb-10 md:order-last md:col-span-3'>
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice!}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isCreatingReservation}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingPage;
