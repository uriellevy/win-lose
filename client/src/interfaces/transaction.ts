export interface ITransactionForm {
  amount:number
  transactionType: TTransactionType
}

export type TTransactionType = "WIN" | "LOSE";

export interface ITransaction extends ITransactionForm {
  _id: string
  createdAt: Date
  updatedAt: Date
  userId:string
}