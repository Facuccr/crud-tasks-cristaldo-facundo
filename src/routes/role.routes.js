import { Router } from "express";
import { createRole, getAllRoles } from "../controllers/role.controller.js";

const roleRouter = Router();

roleRouter.post("/", createRole);
roleRouter.get("/", getAllRoles);

export default roleRouter;
