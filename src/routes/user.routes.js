import { Router } from "express";
import {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import {
  getUserByIdValidations,
  updateUserValidations,
  deleteUserValidations,
  createUserValidations,
} from "../middlewares/validations/users.validations.js";

import { applyValidations } from "../middlewares/validations.js";

const userRouter = Router();

userRouter.get("/", getAllUser);
userRouter.get("/:id", getUserByIdValidations, applyValidations, getUserById);
userRouter.post("/", createUserValidations, applyValidations, createUser);
userRouter.put("/:id", updateUserValidations, applyValidations, updateUser);
userRouter.delete("/:id", deleteUserValidations, applyValidations, deleteUser);

export default userRouter;
