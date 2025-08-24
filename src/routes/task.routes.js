import { Router } from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";

import {
  createTaskValidations,
  updateTaskValidations,
  taskIdParamValidation,
} from "../middlewares/validations/tasks.validations.js";
import { applyValidations } from "../middlewares/validations.js";

const taskRouter = Router();

taskRouter.get("/", getAllTasks);
taskRouter.get("/:id", taskIdParamValidation, applyValidations, getTaskById);
taskRouter.post("/", createTaskValidations, applyValidations, createTask);
taskRouter.put(
  "/:id",
  updateTaskValidations,
  applyValidations,
  taskIdParamValidation,
  updateTask
);
taskRouter.delete("/:id", taskIdParamValidation, applyValidations, deleteTask);

export default taskRouter;
