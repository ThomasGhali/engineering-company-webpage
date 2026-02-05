export type Message = {
  firstName: string;
  lastName: string;
  email: string;
  country: string | null;
  phone: string | null;
  createdAt: Date;
  id: string;
  replied: boolean;
  message: string;
  about: string;
};
