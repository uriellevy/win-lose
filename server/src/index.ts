import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./users/routes";
import transactionsRoutes from "./transactions/routes";
import morgan from "morgan";
import { mongooseConnect } from "./db/db";
import cookieParser from "cookie-parser";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174","https://win-lose-client.vercel.app/"],
    credentials: true,
    methods:["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders:["Content-Type", "Authorization"]
  })
);
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/transactions", transactionsRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () =>
  console.log(`server is running on http://localhost:${PORT}`)
);

mongooseConnect();
