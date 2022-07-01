import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors()).use(express.json());

app.listen(process.env.PORT, () =>
  console.log(`Server up and running at port ${process.env.PORT}`)
);
