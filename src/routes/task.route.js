import { Router } from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/user.controller.js";

const routerTasks = Router();

routerTasks.get("/api/tasks", getAllTasks);
routerTasks.get("/api/tasks/:id", getTaskById);
routerTasks.post("/api/tasks", createTask);
routerTasks.put("/api/tasks/:id", updateTask);
routerTasks.delete("/api/tasks/:id", deleteTask);

export default routerTasks;
