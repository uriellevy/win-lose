import express from "express";
import { addTransaction } from "./controllers";
import { requireAuth } from "../middleware/requireAuth";

const router = express.Router();

router.post("/",requireAuth, addTransaction);
// router.get("/", getAllTransactions);

export default router;