import { Router } from "express";
import {
  getAllUserRoles,
  createUserRole,
} from "../controllers/user_role.controller.js";

const user_roleRouter = Router();

user_roleRouter.post("/", createUserRole);

user_roleRouter.get("/", getAllUserRoles);

export default user_roleRouter;
