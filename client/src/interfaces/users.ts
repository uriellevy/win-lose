export interface ILoginForm {
  userName:string
  password: string
}

export interface IRegisterForm extends ILoginForm {
  userName:string
  password:string
  email:string
}

export interface IUser extends IRegisterForm {
  _id: string
  role: TRole
  createdAt: Date
  updatedAt: Date
}

export interface IUserPayload {
  _id: string
  role: TRole
}

export interface IUserResponse {
  message: string
  user: IRegisterForm
}
export interface IUsersResponse {
  message: string
  list: IUser[]
}

export interface IGoogleLoginPayload {
  credential: string | undefined
  client_id: string
}

export type TRole = "basic" | "admin" | "pro";

export interface IUserDetails {
  message: string
  user: {
    _id: string
    role: TRole
  }
}