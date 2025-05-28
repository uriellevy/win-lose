import express from "express";
import { deleteUserById, getAllUsers, login, logout, register, updatedUserRoleById } from "./controllers";
// import { requireAdminAuth } from "../middlewares/requireAuth";

const router = express.Router();


router.get("/userDetails", () => {console.log("first")});
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
// router.post("/googleLogin", googleLogin)
router.get("/"/* ,requireAdminAuth */, getAllUsers);
// router.get("/:id", getUserById) 
router.delete("/:id"/* ,requireAdminAuth */, deleteUserById);
router.patch("/:id"/* ,requireAdminAuth */, updatedUserRoleById);

export default router;