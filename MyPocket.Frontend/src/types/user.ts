export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
}
export interface LoginModel {
  email: string;
  password: string;
}
export interface LoginResult {
  success: boolean;
  message: string;
  token: string;
  user: IUser | null;
}
export interface SignInModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface SignInResult {
  user: IUser;
  success: boolean;
  message: string;
}
export interface ChangePasswordModel {
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
