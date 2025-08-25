import { Router } from "express";
import {
  createRole,
  getAllRoles,
  deleteRole,
  updateRole,
  getRoleById,
} from "../controllers/role.controller.js";

import {
  createRoleValidations,
  updateRoleValidations,
  roleIdParamValidation,
} from "../middlewares/validations/role.validations.js";

import { applyValidations } from "../middlewares/validations.js";

const roleRouter = Router();

roleRouter.get("/", getAllRoles);
roleRouter.get("/:id", roleIdParamValidation, applyValidations, getRoleById);
roleRouter.post("/", createRoleValidations, applyValidations, createRole);
roleRouter.put("/:id", updateRoleValidations, applyValidations, updateRole);
roleRouter.delete("/:id", roleIdParamValidation, applyValidations, deleteRole);

export default roleRouter;
