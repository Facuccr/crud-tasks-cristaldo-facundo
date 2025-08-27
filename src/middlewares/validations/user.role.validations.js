import { body, param } from "express-validator";
import { user_model } from "../../models/user.model.js";
import { role_model } from "../../models/role.model.js";
import { UserRole } from "../../models/user_role.model.js";
export const createUserRoleValidation = [
  body("user_id")
    .notEmpty()
    .withMessage("el id de usuario es obligatorio")
    .isInt()
    .withMessage("el id de usuario debe ser un numero entero")
    .custom(async (user_id) => {
      const user = await user_model.findByPk(user_id);
      if (!user) {
        throw new Error("el usuario no existe");
      }
      return true;
    }),
  body("role_id")
    .notEmpty()
    .withMessage("el id de rol es obligatorio")
    .isInt()
    .withMessage("el id de rol debe ser un numero entero")
    .custom(async (role_id) => {
      const role = await role_model.findByPk(role_id);
      if (!role) {
        throw new Error("el rol no existe");
      }
      return true;
    })
    .custom(async (role_id, { req }) => {
      const existeRelacion = await UserRole.findOne({
        where: { user_id: req.body.user_id, role_id },
      });
      if (existeRelacion) {
        throw new Error("el usuario ya tiene asignado este rol");
      }
      return true;
    }),
];

export const getUserRoleByIdValidation = [
  param("id")
    .notEmpty()
    .withMessage("el id es obligatorio")
    .isInt()
    .withMessage("el id debe ser un numero entero")
    .custom(async (id) => {
      const relation = await UserRole.findByPk(id);
      if (!relation) {
        throw new Error("la relacion no existe");
      }
      return true;
    }),
];

export const updateUserRoleValidation = [
  param("id")
    .notEmpty()
    .withMessage("el id es obligatorio")
    .isInt()
    .withMessage("el id debe ser un numero entero")
    .custom(async (id) => {
      const relation = await UserRole.findByPk(id);
      if (!relation) {
        throw new Error("la relacion no existe");
      }
      return true;
    }),
  body("user_id")
    .optional()
    .isInt()
    .withMessage("el id de usuario debe ser un numero entero")
    .custom(async (user_id) => {
      if (user_id) {
        const user = await user_model.findByPk(user_id);
        if (!user) {
          throw new Error("el usuario no existe");
        }
      }
      return true;
    }),
  body("role_id")
    .optional()
    .isInt()
    .withMessage("el id de rol debe ser un numero entero")
    .custom(async (role_id) => {
      if (role_id) {
        const role = await role_model.findByPk(role_id);
        if (!role) {
          throw new Error("el rol no existe");
        }
      }
      return true;
    }),
];

export const deleteUserRoleValidation = [
  param("id")
    .notEmpty()
    .withMessage("el id es obligatorio")
    .isInt()
    .withMessage("el id debe ser un numero entero")
    .custom(async (id) => {
      const relation = await UserRole.findByPk(id);
      if (!relation) {
        throw new Error("la relacion no existe");
      }
      return true;
    }),
];
