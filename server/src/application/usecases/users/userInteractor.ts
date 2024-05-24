import { User } from "../../../entities/User";
import {
  comparePassword,
  generateHashPassword,
} from "../../../infrastructure/middlewares/hashPasswordMiddleware";
import { IUserRepository } from "../../interfaces/IUserRepository";
import { IUserInteractor } from "../../interfaces/user/IuserInteractor";

export class UserInteractor implements IUserInteractor {
  private repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  async login(email: string, password: string): Promise<User | null> {
    try {
      let user = await this.repository.findByEmail(email);

      if (!user) {
        return null;
      }
      console.log(user);
      
      const passwordMatch = await comparePassword(password, user.password);

      if (!passwordMatch) {
        throw new Error("password dosen't match");
      }

      return user;
    } catch (error: any) {
      throw new Error(`error in login : ${error.message}`);
    }
  }

  async signup(user: User): Promise<User> {
    try {
      const userExist = await this.repository.findByEmail(user.email);

      if (userExist) {
        throw new Error("user aldready registered");
      }

      const hashedPassword = await generateHashPassword(user.password);

      user.password = hashedPassword;

      const newUser = await this.repository.add(user);

      return newUser;
    } catch (error) {
      throw new Error("user aldready registered");
    }
  }

  updateDetails(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
}
