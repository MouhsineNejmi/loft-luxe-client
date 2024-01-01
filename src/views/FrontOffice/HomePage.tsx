import qs from 'query-string';
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useGetAllListingsQuery } from '@/app/api/listingsApi';
import { useGetCurrentUserQuery } from '@/app/api/usersApi';

import EmptyState from '@/components/EmptyState';
import ListingCard from '@/components/Listings/ListingCard';
import ListingCardSkeleton from '@/components/Skeletons/ListingCardSkeleton';

const HomePage = () => {
  const currentQuery = useRef({});
  const [params] = useSearchParams();

  const { data: listings, isLoading } = useGetAllListingsQuery({
    ...currentQuery.current,
  });
  const { data: currentUser } = useGetCurrentUserQuery();

  useEffect(() => {
    if (params) {
      currentQuery.current = qs.parse(params.toString(), {
        parseNumbers: true,
      });
    }
  }, [params]);

  if (listings?.length === 0 && !isLoading) {
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
