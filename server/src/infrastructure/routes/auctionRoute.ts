import express from "express";
import { AuctionController } from "../../adapters/controllers/auctionController";
import { AuthService } from "../service/authService";
import { AuctionInteractor } from "../../application/usecases/auctoins/auctionInteractor";
import { AuctionRepositry } from "../../adapters/repositories/auctionRepository";
import { UserRepository } from "../../adapters/repositories/userRepository";
const router = express.Router();

const authService = new AuthService();
const repository = new AuctionRepositry();
const userRepository = new UserRepository()
const interactor = new AuctionInteractor(repository,userRepository);

const controller = new AuctionController(authService, interactor);

router.post("/add-auction", controller.onAddAuction.bind(controller));
router.get("/get-auctions", controller.onGetAuction.bind(controller));
router.get("/get-single-auction", controller.onGetOneAuction.bind(controller));
router.put("/edit-auction/:id", controller.onEditAuction.bind(controller));
router.put("/auction-status", controller.onAuctionStatus.bind(controller));

export { router as auctionRouter };
