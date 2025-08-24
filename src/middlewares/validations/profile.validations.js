import { param, body } from "express-validator";
import { UserProfileModel } from "../../models/user.profile.model.js";
import { user_model } from "../../models/user.model.js";

export const createProfileValidations = [
  body("user_id")
    .isInt()
    .withMessage("user_id debe ser un numero entero")
    .custom(async (user_id) => {
      const user = await user_model.findByPk(user_id);
      if (!user) throw new Error("el usuario no existe");

      const existingProfile = await UserProfileModel.findOne({
        where: { user_id },
      });
      if (existingProfile) throw new Error("el usuario ya tiene un perfil");

      return true;
    }),

  body("phone")
    .optional()
    .isLength({ min: 6, max: 20 })
    .withMessage("el telefono debe tener entre 6 y 20 caracteres"),

  body("address")
    .optional()
    .isString()
    .withMessage("la direccion debe ser un texto")
    .isLength({ max: 100 })
    .withMessage("la direccion no puede superar 100 caracteres"),
];

export const updateProfileValidations = [
  param("id").isInt().withMessage("el id debe ser un número entero"),

  body("phone")
    .optional()
    .isLength({ min: 6, max: 20 })
    .withMessage("el tele,fono debe tener entre 6 y 20 caracteres"),

  body("address")
    .optional()
    .isString()
    .withMessage("la direccion debe ser un texto")
    .isLength({ max: 100 })
    .withMessage("la direccion no puede superar 100 caracteres"),
];

export const profileIdParamValidation = [
  param("id")
    .isInt()
    .withMessage("el id debe ser un numero entero")
    .custom(async (id) => {
      const profile = await UserProfileModel.findByPk(id);
      if (!profile) throw new Error("el perfil no existe en la bd");
      return true;
    }),
];
