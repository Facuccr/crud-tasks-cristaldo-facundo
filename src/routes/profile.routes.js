import { Router } from "express";
import {
  createProfile,
  getAllProfiles,
} from "../controllers/profile.controller.js";

const profileRouter = Router();

profileRouter.post("/", createProfile);
profileRouter.get("/", getAllProfiles);

export default profileRouter;
