import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import {
  useAddListingToFavoritesMutation,
  useRemoveListingFromFavoritesMutation,
} from '@/app/api/usersApi';

import { IUser } from '@/types/types';
import useLoginModal from './useLoginModal';

type UseFavoriteProps = {
  currentUser?: IUser | null;
  listingId: string;
};

const useFavorite = ({ currentUser, listingId }: UseFavoriteProps) => {
  const navigate = useNavigate();
  const loginModal = useLoginModal();

  const [addListingToFavorites] = useAddListingToFavoritesMutation();
  const [removeListingFromFavorites] = useRemoveListingFromFavoritesMutation();

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
          toast.success('Listing removed from favorites successfully');
        } else {
          await addListingToFavorites(listingId);
          toast.success('Listing added to favorites successfully');
        }

        navigate(0);
      } catch (error) {
        toast.error('Something went wrong!');
      }
    },
    [
      currentUser,
      hasFavorited,
      listingId,
      loginModal,
      addListingToFavorites,
      removeListingFromFavorites,
      navigate,
    ]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
