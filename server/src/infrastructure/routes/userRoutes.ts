import express from "express";
import {
  loginValidator,
  signupValidator,
} from "../middlewares/userValidation/userValidation";
import { UserController } from "../../adapters/controllers/userController";
import { UserRepository } from "../../adapters/repositories/userRepository";
import { UserInteractor } from "../../application/usecases/users/userInteractor";
import { AuthService } from "../service/authService";
import { MailService } from "../service/mailService";

const router = express.Router();

const repository = new UserRepository();

const mailService = new MailService(repository);

const interactor = new UserInteractor(repository, mailService);

const authService = new AuthService();

const controller = new UserController(interactor, authService);

router.post("/login", loginValidator, controller.onUserLogin.bind(controller));
router.post(
  "/signup",
  signupValidator,
  controller.onUserSignUp.bind(controller)
);

export { router as userRouter };
