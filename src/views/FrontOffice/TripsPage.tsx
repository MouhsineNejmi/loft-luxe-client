import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import {
  useCancelReservationMutation,
  useGetReservationsQuery,
} from '@/app/api/reservationsApi';
import { useGetCurrentUserQuery } from '@/app/api/usersApi';

import EmptyState from '@/components/EmptyState';
import TripsPageSkeleton from '@/components/Skeletons/TripsPageSkeleton';
import ListingCard from '@/components/Listings/ListingCard';
import Heading from '@/components/Heading';

const TripsPage = () => {
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState('');

  const { data: user, isLoading: isLoadingUser } = useGetCurrentUserQuery();
  const { data: reservations, isLoading: isLoadingReservations } =
    useGetReservationsQuery(
      { userId: user?.id },
      {
        skip: !user,
      }
    );
  const [cancelReservation] = useCancelReservationMutation();

  const isLoading = isLoadingUser || isLoadingReservations;

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id);

      try {
        await cancelReservation(id);
        toast.success('Reservation cancelled');
        navigate(0);
      } catch (error) {
        toast.error('Something went wrong');
      }
    },
    [cancelReservation, navigate]
  );

  if (!user && !isLoadingUser) {
    return <EmptyState title='Unauthorized' subtitle='Please login' />;
  }

  if (reservations?.length === 0) {
    return (
      <EmptyState
        title='No Trips Found'
        subtitle="Looks like you haven't reserved any trips"
      />
    );
  }

  return isLoading ? (
    <TripsPageSkeleton />
  ) : (
    <div className='container'>
      <Heading
        title='Trips'
        subtitle="Where you've been and where you're going"
      />
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {reservations?.map((reservation) => (
          <ListingCard
            key={reservation.id}
            listing={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel='Cancel reservation'
            currentUser={user}
          />
        ))}
      </div>
    </div>
  );
};

export default TripsPage;
