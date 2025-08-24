import { Router } from "express";
import {
  getAllUserRoles,
  createUserRole,
  deleteUserRole,
  updateUserRole,
  getUserRoleById,
} from "../controllers/user_role.controller.js";

const user_roleRouter = Router();

user_roleRouter.post("/", createUserRole);
user_roleRouter.get("/", getAllUserRoles);
user_roleRouter.delete("/:id", deleteUserRole);
user_roleRouter.put("/:id", updateUserRole);
user_roleRouter.get("/:id", getUserRoleById);

export default user_roleRouter;
