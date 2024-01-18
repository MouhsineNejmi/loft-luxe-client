import { useGetFavoriteListingsQuery } from "@/app/api/listingsApi";
import { useGetCurrentUserQuery } from "@/app/api/usersApi";

import EmptyState from "@/components/EmptyState";
import Heading from "@/components/Heading";
import ListingCard from "@/components/Listings/ListingCard";
import FavoriteListingsPageSkeleton from "@/components/Skeletons/FavoriteListingsPageSkeleton";

const FavoriteListingsPage = () => {
  const { data: currentUser, isLoading: isLoadingUser } =
    useGetCurrentUserQuery();
  const { data: favoriteListings, isLoading: isFetchingFavoriteListings } =
    useGetFavoriteListingsQuery(null as unknown as void, {
      skip: !currentUser,
    });

  console.log(favoriteListings);

  if (!currentUser && !isLoadingUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  if (favoriteListings?.length === 0) {
    return (
      <EmptyState
        title="No Favorites Found"
        subtitle="Looks like you have no favorite listings."
      />
    );
  }

  return isFetchingFavoriteListings ? (
    <FavoriteListingsPageSkeleton />
  ) : (
    <div className="container">
      <Heading title="Favorites" subtitle="List of places you favorited!" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {favoriteListings?.map((listing) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            listing={listing}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoriteListingsPage;
