import { Router } from "express";
import {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/api/users", getAllUser);
router.get("/api/users/:id", getUserById);
router.post("/api/users", createUser);
router.put("/api/users/:id", updateUser);
router.delete("/api/users/:id", deleteUser);

export default router;
