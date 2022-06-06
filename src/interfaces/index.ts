export interface IUser {
  id?: number;
  email: string;
  name: string;
  password?: string;
  loginTime?: string;
  blocked?: boolean | null;
  registrationTime?: string;
}
