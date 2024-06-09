import express from "express";
import { PaymentController } from "../../adapters/controllers/paymentController";
import { PaymentInteractor } from "../../application/usecases/payments/PaymentInteractor";
import { AuthService } from "../service/authService";
import { PaymentRepository } from "../../adapters/repositories/paymentRepository";
const router = express.Router();

const repository = new PaymentRepository()
const interactor = new PaymentInteractor(repository);
const authService = new AuthService()
const controller = new PaymentController(interactor,authService);

router.post(
  "/create-payment-intent",
  controller.onCreateIntent.bind(controller)
);
router.post(
  "/add-to-wallet",
  controller.onAddToWallet.bind(controller)
);

export { router as paymentRouter };
