import { Error } from "mongoose";
import { IUserRepository } from "../../application/interfaces/user/IUserRepository";
import { User } from "../../entities/User";
import { UserModel } from "../../infrastructure/db/models/userMoldel";
import { ErrorResponse } from "../../utils/errors";

export class UserRepository implements IUserRepository {
  async find(filter: any): Promise<User[]> {
    try {
      const data = await UserModel.find(filter);
      return data;
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }
  }
  async findOne(id: string): Promise<User | null> {
    try {
      const data = await UserModel.findById(id);
      return data;
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const data = await UserModel.findOne({ email });
      return data;
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }
  }
  async add(user: User): Promise<User> {
    try {
      const data = new UserModel(user);
      await data.save();
      return data;
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }
  }
  async update(id: string, value: any): Promise<User | null> {
    try {
      console.log(id, value);

      const updatedUser = await UserModel.findByIdAndUpdate(id, value, {
        new: true,
      });
      console.log(updatedUser);

      return updatedUser;
    } catch (error: any) {
      console.log(error);

      throw new ErrorResponse(error.message, error.status);
    }
  }
  async upsert(user: User): Promise<boolean> {
    try {
      const updatedUser = await UserModel.findOneAndUpdate(
        { email: user.email },
        {
          $set: user,
        },
        { upsert: true }
      );

      return true;
    } catch (error: any) {
      throw new ErrorResponse(error.message, error.status);
    }
  }
}
