import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
const router = express.Router();

router.get("/get-notification", isAuthenticated);
router.post("/add-notificaion", isAuthenticated);
router.put("/edit-notificaion/:id", isAuthenticated);

export { router as notificationRoute };
