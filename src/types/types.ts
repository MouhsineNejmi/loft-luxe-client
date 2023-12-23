export type IUser = {
  id: string;
  username: string;
  email: string;
  emailVerified: boolean;
  image: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  favoriteIds: string[];
};

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
