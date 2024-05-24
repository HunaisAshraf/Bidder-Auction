import { IUserRepository } from "../../application/interfaces/user/IUserRepository";
import { User } from "../../entities/User";
import { UserModel } from "../../infrastructure/db/models/userMoldel";

export class UserRepository implements IUserRepository {
  async find(filter: any): Promise<User[]> {
    try {
      const data = await UserModel.find(filter);
      return data;
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }
  async findOne(id: string): Promise<User | null> {
    try {
      const data = await UserModel.findById(id);
      return data;
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const data = await UserModel.findOne({ email });
      return data;
    } catch (error) {
      throw new Error("error in finding user");
    }
  }
  async add(user: User): Promise<User> {
    try {
      const data = new UserModel(user);
      await data.save();
      return data;
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }
  async update(id: string, user: User): Promise<User | null> {
    try {
      const data = await UserModel.findByIdAndUpdate(id, user);
      return data;
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }
}
