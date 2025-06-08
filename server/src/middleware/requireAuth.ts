import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: string
}

export const requireAuth = (req: AuthRequest, res: Response, next:NextFunction) => {
  console.log(req.cookies)
  const token = req.cookies.authToken;
  if(!token) {
    res.status(401).json({message:"Authorization required"});
    return;
  }

  try {
    //@ts-ignore
    const {_id} = jwt.verify(token,"dsajdjksadkjsahdas")

    req.userId = _id;

    next();
  } catch (error) {
    res.status(401).json({message: "Authorization required"})
  }
}