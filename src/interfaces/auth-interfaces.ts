export type TLoginPayload = {
  username: string;
  password: string;
};

export type TSignUpPayload = {
  username: string;
  password: string;
  email?: string;
  fullName?: string;
};
