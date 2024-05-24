import { Request, Response, NextFunction } from "express";
import { User } from "../../entities/User";
import { IUserInteractor } from "../../application/interfaces/IuserInteractor";
import { validationResult } from "express-validator";

export class UserController {
  private interactor: IUserInteractor;
  constructor(interactor: IUserInteractor) {
    this.interactor = interactor;
  }

  async onUserLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        console.log(errors.array());
        throw new Error("Invalid email or password");
      }

      const { email, password } = req.body;
      const data = await this.interactor.login(email, password);

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  async onUserSignUp(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        console.log(errors.array());
        throw new Error("invalid credentials");
      }

      const body = req.body;

      const data = await this.interactor.signup(body);

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
