import { Router } from "express";
import {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", getAllUser);
userRouter.get("/:id", getUserById);
userRouter.post("/", createUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
