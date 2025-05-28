import { Request, Response } from "express";
import { IUserForm, IUserLoginForm } from "../interfaces/users";
// // import { User } from "../db/schemas/Users";
// // import { Expense } from "../db/schemas/Expense";
import bcrypt from "bcrypt";
import { User } from "./schema";
import jwt from "jsonwebtoken";
// // import { OAuth2Client } from "google-auth-library";
// import dotenv from "dotenv";
// dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const list = await User.find();
    res.status(200).json({ message: "All users recieved successfully!", list });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json({ message: "user recieved successfully", user });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
export const register = async (req: Request, res: Response) => {
  const { password, email } = req.body as IUserForm;
  const saltNumber = 10;

  if (!password || !email) throw Error("password and email are required");

  try {
    const hashedPassword = await bcrypt.hash(password, saltNumber);

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      res.status(400).json({ message: "user already exist" });
      return;
    }

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
      role: "basic",
    });
    res.status(201).json({ message: "new user registered", user: newUser });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { userName, password } = req.body as IUserLoginForm;
  if (!userName || !password) {
    res.status(400).json({ message: "userName and password required" });
    return;
  }

  try {
    const user = await User.findOne({ userName });
    if (!user) {
      res.status(404).json({ message: "user not exist" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "password incorrect" });
      return;
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      "dsajdjksadkjsahdas",
      { expiresIn: "3d" }
    );

    res
      .cookie("authToken", token, {
        httpOnly: isProduction, // Prevent client-side access
        secure: isProduction, // Secure cookies for HTTPS (Vercel)
        sameSite: isProduction ? "none" : "strict", // Cross-origin support on Vercel
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: "user logged in successfully", token });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

// export const googleLogin = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   const { credential, client_id } = req.body;
//   const client = new OAuth2Client();

//   try {
//     const ticket = await client.verifyIdToken({
//       idToken: credential,
//       audience: client_id,
//     });

//     const payload = ticket.getPayload();

//     if (!payload) {
//       res.status(400).json({ message: "token payload not found" });
//       return;
//     }

//     const { email, picture, family_name, given_name, name } = payload;

//     let user = await User.findOne({ email });
//     if (!user) {
//       const newUser = {
//         firstName: given_name,
//         lastName: family_name,
//         userName: name,
//         password: "",
//         email: email,
//         image: picture,
//         role: "basic",
//       };
//       user = await User.create(newUser);
//     }

//     const token = jwt.sign(
//       { _id: user._id, role: user.role },
//       "dsajdjksadkjsahdas",
//       { expiresIn: "3d" }
//     );

//     res
//       .cookie("authToken", token, {
//         httpOnly: false,
//         secure: false,
//         sameSite: "strict",
//         maxAge: 24 * 60 * 60 * 1000,
//       })
//       .status(200)
//       .json({ message: "user logged in successfully", token });
//   } catch (error) {
//     res.status(400).json({ message: error });
//   }
// };

export const logout = async (req: Request, res: Response) => {
  try {
    res
      .clearCookie("authToken", {
        httpOnly: false,
        secure: false,
        sameSite: "strict",
        // maxAge: 24 * 60 * 60 *1000,
      })
      .status(200)
      .json({ message: "User loged out successfully" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
export const deleteUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      res.status(404).json({ message: "user not found" });
      return;
    }
    // await Expense.deleteMany({ userId: id });
    const list = await User.find();
    res.status(200).json({ message: "User deleted successfully", list });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updatedUserRoleById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    const updateRole = await User.findByIdAndUpdate(id, { role });
    if (!updateRole) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "User role updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getUserDetails = async (req: Request, res: Response) => {
  const token = req.cookies.authToken;
  if (!token) {
    res.status(401).json({ message: "Authorization required" });
    return;
  }

  try {
    //@ts-ignore
    const { role, _id } = jwt.verify(token, "dsajdjksadkjsahdas");
    res.status(200).json({ message: "User Online", user: { role, _id } });
  } catch (error) {
    res.status(401).json({ message: error });
  }
};
