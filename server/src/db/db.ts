import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
export const mongooseConnect = () => {
  mongoose.connect(`${process.env.MONGO_URL}`)
  .then(() => console.log("mongo db connected"))
  .catch((error) => console.log(error))
}