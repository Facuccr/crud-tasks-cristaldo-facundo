import { Router } from "express";
import {
  getAllUserRoles,
  createUserRole,
  deleteUserRole,
  updateUserRole,
  getUserRoleById,
} from "../controllers/user_role.controller.js";

import {
  createUserRoleValidation,
  updateUserRoleValidation,
  getUserRoleByIdValidation,
  deleteUserRoleValidation,
} from "../middlewares/validations/user.role.validations.js";

import { applyValidations } from "../middlewares/validations.js";

const user_roleRouter = Router();

user_roleRouter.get("/", getAllUserRoles);
user_roleRouter.get(
  "/:id",
  getUserRoleByIdValidation,
  applyValidations,
  getUserRoleById
);
user_roleRouter.post(
  "/",
  createUserRoleValidation,
  applyValidations,
  createUserRole
);
user_roleRouter.put(
  "/:id",
  updateUserRoleValidation,
  applyValidations,
  updateUserRole
);
user_roleRouter.delete(
  "/:id",
  deleteUserRoleValidation,
  applyValidations,
  deleteUserRole
);

export default user_roleRouter;
