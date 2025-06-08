import { Request, Response } from "express";
import { AuthRequest } from "../middleware/requireAuth";
import { model } from "mongoose";
import { Transaction } from "./schema";

export const addTransaction = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;
  const {amount, type} = req.body;
  try {
     await Transaction.create({
      amount,
      transactionType: type,
      userId,
    });
    res.status(201).json({message: "New Transaction Added"});
    
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

// export const createExpense = async (req: AuthRequest, res: Response) => {
//   const { title, category, amount, expenseType } = req.body;
//   const userId = req.userId;

//   try {
//     const newExpense = await Expense.create({
//       title,
//       category,
//       amount,
//       expenseType,
//       userId,
//     });
//     res
//       .status(201)
//       .json({
//         message: "New expense created succeessfully",
//         expense: newExpense,
//       });
//   } catch (error) {
//     res.status(400).json({ message: error });
//   }
// };

