import useFavorite from '@/hooks/useFavorites';
import { IUser } from '@/types/types';
import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

type HeartButtonProps = {
  listingId: string;
  currentUser?: IUser | null;
};

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    currentUser,
    listingId,
  });

  return (
    <button
      onClick={toggleFavorite}
      className='relative w-8 h-8 bg-white/70 rounded-full flex items-center justify-center shadow-sm hover:opacity-80 transition cursor-pointer'
    >
      <AiOutlineHeart size={24} className='fill-white absolute' />
      <AiFillHeart
        size={24}
        className={hasFavorited ? 'fill-rose-600' : 'fill-neutral-500/70'}
      />
    </button>
  );
};

export default HeartButton;
