export interface ITransactionForm {
  amount:number
  type: "win" | "lose"
}

export interface ITransaction extends ITransactionForm {
  _id: string
  createdAt: Date
  updatedAt: Date
}