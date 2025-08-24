import { Router } from "express";
import {
  createProfile,
  getAllProfiles,
  getProfileById,
  updateProfile,
  deleteProfile,
} from "../controllers/profile.controller.js";

import {
  createProfileValidations,
  updateProfileValidations,
  profileIdParamValidation,
} from "../middlewares/validations/profile.validations.js";

import { applyValidations } from "../middlewares/validations.js";

const profileRouter = Router();

profileRouter.get("/", getAllProfiles);
profileRouter.get(
  "/:id",
  profileIdParamValidation,
  applyValidations,
  getProfileById
);
profileRouter.post(
  "/",
  createProfileValidations,
  applyValidations,
  createProfile
);
profileRouter.put(
  "/:id",
  profileIdParamValidation,
  updateProfileValidations,
  applyValidations,
  updateProfile
);
profileRouter.delete(
  "/:id",
  profileIdParamValidation,
  applyValidations,
  deleteProfile
);

export default profileRouter;
