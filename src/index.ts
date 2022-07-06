import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { userRouter } from "./routes/userRouter";
import { cardRouter } from "./routes/cardRoutes";

dotenv.config();

const app = express();

app.use(cors()).use(express.json()).use(userRouter).use(cardRouter);

app.listen(process.env.PORT, () =>
  console.log(`Server up and running at port ${process.env.PORT}`)
);
