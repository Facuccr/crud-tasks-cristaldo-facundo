import { body, param } from "express-validator";
import { user_model } from "../../models/user.model.js";

export const createUserValidations = [
  body("name")
    .notEmpty()
    .withMessage("el nombre es obligatorio")
    .isLength({ min: 3 })
    .withMessage("su nombre debe de tener al menos 3 caracteres")
    .isString()
    .withMessage("el nombre debe de ser una cadena de texto"),

  body("email")
    .notEmpty()
    .withMessage("el email es obligatorio")
    .isEmail()
    .withMessage("el email debe tener un formato valido")
    .custom(async (email) => {
      const existingEmail = await user_model.findOne({ where: { email } });
      if (existingEmail) {
        throw new Error("ya existe un user con ese email");
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("la contraseña es obligatoria")
    .isLength({ min: 6 })
    .withMessage("la contraseña debe tener un minimo de 6 carcateres"),
];

export const updateUserValidations = [
  param("id")
    .isInt()
    .withMessage("el id debe de ser un entero")
    .custom(async (id) => {
      const existingUser = await user_model.findByPk(id);
      if (!existingUser) {
        throw new Error("el id no existe en la bd");
      }
      return true;
    }),

  body("name")
    .optional()
    .isString()
    .withMessage("la contraseña debe ser texto"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("el email no tiene formato valido")
    .custom(async (email) => {
      const existingEmail = await user_model.findOne({ where: { email } });
      if (existingEmail) {
        throw new Error("ya existe un user con ese email");
      }
      return true;
    }),

  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("debe tener al menos 6 caracteres"),
];

export const deleteUserValidations = [
  param("id")
    .isInt()
    .withMessage("el id debe de ser un numero entero")
    .custom(async (id) => {
      const user = await user_model.findByPk(id);
      if (!user) {
        throw new Error("El usuario no existe en la bd");
      }
      return true;
    }),
];

export const getUserByIdValidations = [
  param("id")
    .isInt()
    .withMessage("el id debe de ser un numero entero")
    .custom(async (id) => {
      const existingUser = user_model.findByPk(id);
      if (!existingUser) {
        throw new Error("El usuario no existe en la bd");
      }
      return true;
    }),
];
