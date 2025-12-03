import "dotenv/config";
import { prisma } from "@repo/db";
import express from 'express';
import cors from 'cors'
import { appRouter } from "./routes/route.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/user", appRouter)


app.listen(3000, () => {
  console.log("the app is listening to port 3000");
});




