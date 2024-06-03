import express from "express";
import { connectDb } from "./infrastructure/db/dbConnection";
import dotenv from "dotenv";
import { errorHandler } from "./infrastructure/middlewares/errorHandler";
import { userRouter } from "./infrastructure/routes/userRoutes";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { auctionRouter } from "./infrastructure/routes/auctionRoute";

const app = express();
dotenv.config();
connectDb();
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/auth", userRouter);
app.use("/api/auction", auctionRouter);
app.use(errorHandler);

const port = 5000;

app.listen(port, () => {
  console.log(`server running in port ${port}`);
});
