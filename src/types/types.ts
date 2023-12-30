import { IconType } from 'react-icons';

// -------------- User Interface
export interface IUser {
  id: string;
  username: string;
  email: string;
  emailVerified: boolean;
  image: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  role: string;
  favoriteIds: string[];
}

export type IRegisterMutateUser = {
  username: string;
  email: string;
  password: string;
};

export type ILoginMutateUser = {
  username: string;
  password: string;
};

export type IGenericResponse = {
  status: string;
  message: string;
};

export type IAuthResponse = {
  status: string;
  user: IUser;
};

// -------------- Listing Interface
export interface IListing {
  id?: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  location: string;
  price: number;
  user: IUser;
}

export type IListingResponse = {
  status: string;
  listing: IListing;
};

export type IListingsResponse = {
  status: string;
  listings: IListing[];
};

export type IListingInputs =
  | 'images'
  | 'category'
  | 'location'
  | 'guestCount'
  | 'roomCount'
  | 'bathroomCount'
  | 'price'
  | 'title'
  | 'description';

// -------------- Listing Interface
export interface IReservation {
  id?: string;
  userId: string;
  listingId: string | undefined;
  startDate?: Date;
  endDate?: Date;
  totalPrice: number;
  createdAt?: string;
}

export type ReservationQuery = {
  userId?: string;
  listingId?: string;
  authorId?: string;
};

export type IReservationResponse = {
  status: string;
  reservation: IReservation;
};

export type IReservationsResponse = {
  status: string;
  reservations: IReservation[];
};

// -------------- Category Type
export type Category = {
  label: string;
  icon: IconType;
  description: string;
};
