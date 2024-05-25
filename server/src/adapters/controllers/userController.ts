import { Request, Response, NextFunction } from "express";
import { User } from "../../entities/User";
import { IUserInteractor } from "../../application/interfaces/user/IuserInteractor";
import { validationResult } from "express-validator";
import { IAuthService } from "../../application/interfaces/service/IAuthService";

export class UserController {
  private interactor: IUserInteractor;
  private authService: IAuthService;
  constructor(interactor: IUserInteractor, authService: IAuthService) {
    this.interactor = interactor;
    this.authService = authService;
  }

  async onUserLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        console.log(errors.array());
        throw new Error("Invalid email or password");
      }

      const { email, password } = req.body;
      const user = await this.interactor.login(email, password);
      console.log(user);
      const data = {
        _id: user?._id,
        email: user?.email,
      };

      const token = this.authService.generateToken(data);
      res.cookie("token", token, { httpOnly: true });

      return res.status(200).json({ success: true, user });
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

      const user = await this.interactor.signup(body);
      const data = {
        _id: user?._id,
        email: user?.email,
      };

      const token = this.authService.generateToken(data);
      res.cookie("token", token, { httpOnly: true });

      res.status(200).json({ success: true, user });
    } catch (error) {
      next(error);
    }
  }
}
