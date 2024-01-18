import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import {
  useAddListingToFavoritesMutation,
  useGetCurrentUserQuery,
  useRemoveListingFromFavoritesMutation,
} from "@/app/api/usersApi";

import { IUser } from "@/types/types";

import useLoginModal from "@/hooks/useLoginModal";

type UseFavoriteProps = {
  currentUser?: IUser | null;
  listingId: string;
};

const useFavorite = ({ currentUser, listingId }: UseFavoriteProps) => {
  const loginModal = useLoginModal();

  const { refetch: refetchCurrentUser } = useGetCurrentUserQuery();
  const [addListingToFavorites, { isSuccess: isAddedToFavorite }] =
    useAddListingToFavoritesMutation();
  const [removeListingFromFavorites, { isSuccess: isRemovedFromFavorite }] =
    useRemoveListingFromFavoritesMutation();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        if (hasFavorited) {
          await removeListingFromFavorites(listingId);

          if (isRemovedFromFavorite) {
            toast.success("Listing removed from favorites successfully");
          }
        } else {
          await addListingToFavorites(listingId);

          if (isAddedToFavorite) {
            toast.success("Listing added to favorites successfully");
          }
        }

        refetchCurrentUser();
      } catch (error) {
        toast.error("Something went wrong!");
      }
    },
    [
      currentUser,
      hasFavorited,
      listingId,
      loginModal,
      addListingToFavorites,
      removeListingFromFavorites,
    ]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
