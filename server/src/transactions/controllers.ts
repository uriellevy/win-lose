import { Request, Response } from "express";
import { AuthRequest } from "../middleware/requireAuth";
import { model } from "mongoose";
import { Transaction } from "./schema";

export const addTransaction = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;
  const {amount, transactionType} = req.body;
  try {
     await Transaction.create({
      amount,
      transactionType,
      userId,
    });
    res.status(201).json({message: "New Transaction Added"});
    
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getAllTransactions = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;

  try {
    const list = await Transaction.find({userId: userId });
    res.status(200).json({message:" All transactions recieved successfully",list})
    
  } catch (error) {
    res.status(400).json({ message: error });
  }
}