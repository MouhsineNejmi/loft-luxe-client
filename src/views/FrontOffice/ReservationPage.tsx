import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import {
  useCancelReservationMutation,
  useGetReservationsQuery,
} from '@/app/api/reservationsApi';
import { useGetCurrentUserQuery } from '@/app/api/usersApi';

import EmptyState from '@/components/EmptyState';
import Heading from '@/components/Heading';
import ListingCard from '@/components/Listings/ListingCard';
import ReservationPageSkeleton from '@/components/Skeletons/ReservationPageSkeleton';

const ReservationPage = () => {
  const { data: user, isLoading: isLoadingUser } = useGetCurrentUserQuery();
  const { data: reservations, isLoading: isLoadingReservations } =
    useGetReservationsQuery(
      { userId: user?.id },
      {
        skip: !user,
      }
    );
  const [cancelReservation] = useCancelReservationMutation();

  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id);

      try {
        await cancelReservation(id);
        toast.success('Reservation cancelled');
        navigate(0);
      } catch (error) {
        toast.error('Something went wrong.');
      }
    },
    [navigate, cancelReservation]
  );

  if (!user && !isLoadingUser) {
    return <EmptyState title='Unauthorized' subtitle='Please login' />;
  }

  if (reservations?.length === 0) {
    return (
      <EmptyState
        title='No Reservations Found'
        subtitle='Looks like you have no reservation on your property'
      />
    );
  }

  return isLoadingReservations ? (
    <ReservationPageSkeleton />
  ) : (
    <div className='container'>
      <Heading title='Reservations' subtitle='Bookings on your properties' />
      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {reservations?.map((reservation) => (
          <ListingCard
            key={reservation.id}
            listing={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel='Cancel guest reservation'
            currentUser={user}
          />
        ))}
      </div>
    </div>
  );
};

export default ReservationPage;
