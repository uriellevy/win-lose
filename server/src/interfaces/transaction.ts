export interface ITransactionForm {
  amount: number;
  transactionType: TTransactionType
  userId: string
}

type TTransactionType = "WIN"| "LOSE";

export interface ITransaction extends ITransactionForm {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}