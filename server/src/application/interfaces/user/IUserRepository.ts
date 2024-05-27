import { User } from "../../../entities/User";

export interface IUserRepository {
  find(filter: any): Promise<User[]>;
  findOne(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  add(user: User): Promise<User>;
  update(email: string, user: any): Promise<User | null>;
}
