import mongoose,{ Schema } from "mongoose";
import { ITransactionForm } from "../interfaces/transaction";

const transactionSchema = new Schema<ITransactionForm>({
  amount: {type:Number, required:true},
  transactionType: {type:String, required:true},
  userId: {type:String, required:true},
},{timestamps:true});

export const Transaction = mongoose.model<ITransactionForm>("Transaction", transactionSchema);