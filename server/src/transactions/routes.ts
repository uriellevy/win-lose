import express from "express";
import { addTransaction, getAllTransactions } from "./controllers";
import { requireAuth } from "../middleware/requireAuth";

const router = express.Router();

router.post("/",requireAuth, addTransaction);
router.get("/",requireAuth, getAllTransactions);

export default router;