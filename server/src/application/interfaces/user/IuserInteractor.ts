import { User } from "../../../entities/User";

export interface IUserInteractor {
  login(email: string, password: string): Promise<User | null>;
  signup(user: User): Promise<User>;
  updateDetails(email: string, password: string): Promise<User>;
  verifyMail(type: string, token: string, email: string): Promise<User | null>;
  forgotPassword(email: string): Promise<void>;
}
