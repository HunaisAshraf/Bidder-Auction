import { User } from "../../entities/User";

export interface IUserInteractor {
  login(email: string, password: string): Promise<User | null>;
  signup(user: User): Promise<User>;
  updateDetails(user: User): Promise<User>;
}
