import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  useDeleteListingMutation,
  useGetAllListingsQuery,
} from "@/app/api/listingsApi";
import { useGetCurrentUserQuery } from "@/app/api/usersApi";

import EmptyState from "@/components/EmptyState";
import PropertiesPageSkeleton from "@/components/Skeletons/PropertiesPageSkeleton";
import ListingCard from "@/components/Listings/ListingCard";
import Heading from "@/components/Heading";

const PropertiesPage = () => {
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState("");

  const { data: user, isLoading: isLoadingUser } = useGetCurrentUserQuery();
  const {
    data: listings,
    isLoading: isLoadingListings,
    refetch: refetchListings,
  } = useGetAllListingsQuery(
    { userId: user?.id },
    {
      skip: !user,
    }
  );
  const [deleteListing] = useDeleteListingMutation();

  const isLoading = isLoadingUser || isLoadingListings;

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id);

      try {
        await deleteListing(id);
        toast.success("Property deleted Successfully.");
        // navigate(0);
        refetchListings();
      } catch (error) {
        toast.error("Something went wrong!");
      }
    },
    [deleteListing, navigate]
  );

  if (!user && !isLoadingUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  if (listings?.length === 0) {
    return (
      <EmptyState
        title="No Properties Found"
        subtitle="Looks like you have no properties"
      />
    );
  }

  return isLoading ? (
    <PropertiesPageSkeleton />
  ) : (
    <div className="container">
      <Heading title="Properties" subtitle="List of your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings?.map((listing) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel="Delete Property"
            currentUser={user}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertiesPage;
