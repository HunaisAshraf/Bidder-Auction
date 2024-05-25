import express from "express";
import { connectDb } from "./infrastructure/db/dbConnection";
import dotenv from "dotenv";
import { errorHandler } from "./infrastructure/middlewares/errorHandler";
import { userRouter } from "./infrastructure/routes/userRoutes";
import cors from "cors";

const app = express();
dotenv.config();
connectDb();
app.use(cors());
app.use(express.json());

app.use("/api/auth", userRouter);
app.use(errorHandler);

const port = 5000;

app.listen(port, () => {
  console.log(`server running in port ${port}`);
});
