export type ReactSetState = React.Dispatch<React.SetStateAction<string>>;

export type User = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  profilePicture?: string;
  token: string;
  role: string;
};

export type AuthData = {
  user?: User | null;
  //   admin?: User | null;
};

export type AdminAuthData = {
  admin?: User | null;
};
