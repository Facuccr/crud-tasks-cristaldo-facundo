import { body, param } from "express-validator";
import { role_model } from "../../models/role.model.js";

export const createRoleValidations = [
  body("name")
    .notEmpty()
    .withMessage("el nombre es obligatorio")
    .isString()
    .withMessage("el nombre debe ser texto")
    .isLength({ max: 50 })
    .withMessage("el nombre no debe superar 50 caracteres")
    .custom(async (name) => {
      const existing = await role_model.findOne({ where: { name } });
      if (existing) throw new Error("ya existe un rol con ese nombre");
      return true;
    }),
];

export const updateRoleValidations = [
  param("id")
    .isInt()
    .withMessage("el id debe ser un numero entero")
    .custom(async (id) => {
      const role = await role_model.findByPk(id);
      if (!role) throw new Error("el rol no existe");
      return true;
    }),
  body("name")
    .notEmpty()
    .withMessage("el nombre es obligatorio")
    .isString()
    .withMessage("el nombre debe ser texto")
    .isLength({ max: 50 })
    .withMessage("el nombre no debe superar 50 caracteres")
    .custom(async (name) => {
      const existing = await role_model.findOne({ where: { name } });
      if (existing) throw new Error("ya existe un rol con ese nombre");
      return true;
    }),
];

export const roleIdParamValidation = [
  param("id")
    .isInt()
    .withMessage("el id debe ser un numero entero")
    .custom(async (id) => {
      const role = await role_model.findByPk(id);
      if (!role) throw new Error("el rol no existe en la bd");
      return true;
    }),
];
