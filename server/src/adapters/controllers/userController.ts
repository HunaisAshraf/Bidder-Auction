import { Request, Response, NextFunction } from "express";
import { User } from "../../entities/User";
import { IUserInteractor } from "../../application/interfaces/user/IuserInteractor";
import { validationResult } from "express-validator";
import { IAuthService } from "../../application/interfaces/service/IAuthService";
import { IRequestWithUser } from "../../application/types/types";
import { ErrorResponse } from "../../utils/errors";

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
        throw new ErrorResponse("Invalid email or password", 401);
      }

      const { email, password } = req.body;
      const user = await this.interactor.login(email, password);
      console.log(user);

      if (user?.role === "admin") {
        throw new ErrorResponse("User not found", 404);
      }

      const data = {
        _id: user?._id,
        email: user?.email,
        role: user?.role,
      };

      const loginUser = {
        ...JSON.parse(JSON.stringify(user)),
        password: undefined,
      };

      const token = this.authService.generateToken(data);
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      });

      return res.status(200).json({ success: true, user: loginUser, token });
    } catch (error) {
      next(error);
    }
  }

  async onAdminLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        console.log(errors.array());
        throw new ErrorResponse("Invalid email or password", 401);
      }

      const { email, password } = req.body;

      const admin = await this.interactor.adminLogin(email, password);

      const data = {
        _id: admin?._id,
        email: admin?.email,
        role: admin?.role,
      };

      const adminLogin = {
        ...JSON.parse(JSON.stringify(admin)),
        password: undefined,
      };

      const token = this.authService.generateToken(data);
      res.cookie("admin_token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      });

      return res.status(200).json({ success: true, admin: adminLogin, token });
    } catch (error) {
      next(error);
    }
  }

  async onUserSignUp(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        console.log(errors.array());

        let err = errors.array();
        throw new ErrorResponse(err[0].msg, 401);
      }

      const body = req.body;
      const user = await this.interactor.signup(body);
      const data = {
        _id: user?._id,
        email: user?.email,
        role: user?.role,
      };

      const newUser = {
        ...JSON.parse(JSON.stringify(user)),
        password: undefined,
      };

      const token = this.authService.generateToken(data);
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      });
      return res.status(200).json({ success: true, user: newUser, token });
    } catch (error) {
      console.log(error);

      next(error);
    }
  }

  async onVerifyAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const { type, token, email } = req.body;

      const data = await this.interactor.verifyMail(type, token, email);

      if (data) {
        res
          .status(200)
          .json({ success: true, message: "account verified", data });
      }
    } catch (error) {
      next(error);
    }
  }

  async onForgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const data = await this.interactor.forgotPassword(email);

      res
        .status(200)
        .json({ success: true, message: "mail send successfully" });
    } catch (error) {
      next(error);
    }
  }

  async onUpdateUser(req: IRequestWithUser, res: Response, next: NextFunction) {
    try {
      const { id } = req.user!;

      const body = req.body;

      let user = await this.interactor.updateDetails(id, body);

      return res.status(200).json({ success: true, user });
    } catch (error) {
      next(error);
    }
  }

  async onUpdatePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const user = await this.interactor.updatePassword(email, password);
      return res.status(200).json({ success: true });
    } catch (error) {
      next(error);
    }
  }

  async onGoogleSignUp(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("reached controeller");

      const body = req.body;
      body.isVerified = true;
      console.log("body", body);

      const user = await this.interactor.googleSignUp(body);
      console.log("user", user);

      const data = {
        _id: user?._id,
        email: user?.email,
        role: user?.role,
      };

      const token = this.authService.generateToken(data);

      console.log(token);

      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      });
      console.log("user", user);
      return res.status(200).json({ success: true, user, token });
    } catch (error) {
      next(error);
    }
  }

  async onUserLogout(req: Request, res: Response, next: NextFunction) {
    try {
      res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
      return res.status(200).send({ success: true });
    } catch (error) {
      next(error);
    }
  }

  async onUpdateProfileImage(
    req: IRequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.user!;
      const { fileUrl } = req.body;

      const user = await this.interactor.updateProfileImage(id, fileUrl);

      return res.status(200).send({ success: true, user });
    } catch (error) {
      next(error);
    }
  }

  onVerifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).send({ success: true, message: "user verified" });
    } catch (error) {
      next(error);
    }
  }
}
