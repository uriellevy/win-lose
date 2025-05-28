export interface IUserForm {
  firstName:string
  lastName:string
  userName:string
  password:string
  email:string
}

export interface IUser extends IUserForm{
  _id:string
  role: IRole
  createdAt: Date
  updatedAt: Date
}

export interface IUserLoginForm {
  userName:string
  password:string
}

export interface AuthRequest extends Request {
  userId?: string
}

export type IRole = "basic" | "admin"