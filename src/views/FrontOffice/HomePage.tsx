import { useGetAllListingsQuery } from '@/app/api/listingsApi';
import { useGetCurrentUserQuery } from '@/app/api/usersApi';

import EmptyState from '@/components/EmptyState';
import ListingCard from '@/components/Listings/ListingCard';
import ListingCardSkeleton from '@/components/Skeletons/ListingCardSkeleton';

const HomePage = () => {
  const { data: listings, isLoading } = useGetAllListingsQuery();
  const { data: currentUser } = useGetCurrentUserQuery();

  if (!listings && !isLoading) {
    return <EmptyState showReset />;
  }

  return (
    <div className='container pt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
      {isLoading
        ? [1, 2, 3, 4].map((num: number) => <ListingCardSkeleton key={num} />)
        : listings?.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
              currentUser={currentUser}
            />
          ))}
    </div>
  );
};

export default HomePage;
