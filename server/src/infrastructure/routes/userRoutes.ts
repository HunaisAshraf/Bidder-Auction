import express from "express";
import { loginValidator, signupValidator } from "../middlewares/userValidation/userValidation";
import { UserController } from "../../adapters/controllers/userController";
import { UserRepository } from "../../adapters/repositories/userRepository";
import { UserInteractor } from "../../application/usecases/users/userInteractor";

const router = express.Router();

const repository = new UserRepository();

const interactor = new UserInteractor(repository);

const controller = new UserController(interactor);

router.post("/login", loginValidator, controller.onUserLogin.bind(controller));
router.post("/signup", signupValidator, controller.onUserSignUp.bind(controller));

export { router as userRouter };
