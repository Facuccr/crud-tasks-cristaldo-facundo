import { param, body } from "express-validator";
import { task_model } from "../../models/task.model.js";
import { user_model } from "../../models/user.model.js";

export const createTaskValidations = [
  body("title")
    .notEmpty()
    .withMessage("el titulo es obligatorio")
    .isLength({ max: 100 })
    .withMessage("el titulo no debe tener mas de 100 caracteres")
    .custom(async (title) => {
      const existingTitle = await task_model.findOne({ where: { title } });
      if (existingTitle) {
        throw new Error("ya existe una tarea con este titulo");
      }
      return true;
    }),

  body("description")
    .notEmpty()
    .withMessage("la descripcion es obligatoria")
    .isLength({ max: 100 })
    .withMessage("la descripcion no debe tener mas de 100 caracteres"),

  body("isComplete").isBoolean().withMessage("isComplete debe ser booleano"),

  body("userId")
    .isInt()
    .withMessage("userId debe ser un número entero")
    .custom(async (userId) => {
      const user = await user_model.findByPk(userId);
      if (!user) {
        throw new Error("el usuario no existe");
      }
      return true;
    }),
];

export const updateTaskValidations = [
  param("id").isInt().withMessage("el id debe ser un número entero"),

  body("title")
    .optional()
    .isLength({ max: 100 })
    .withMessage("el titulo no debe tener mas de 100 caracteres")
    .custom(async (title) => {
      const existingTask = await task_model.findOne({ where: { title } });
      if (existingTask) {
        throw new Error("ya existe una tarea con este titulo");
      }
      return true;
    }),

  body("description")
    .optional()
    .isLength({ max: 100 })
    .withMessage("la descripcion no debe tener mas de 100 caracteres"),

  body("isComplete")
    .optional()
    .isBoolean()
    .withMessage("isComplete debe ser booleano"),
];

export const taskIdParamValidation = [
  param("id")
    .isInt()
    .withMessage("el id debe ser un número entero")
    .custom(async (id) => {
      const existingTask = await task_model.findByPk(id);
      if (!existingTask) {
        throw new Error("no existe una tarea con este id en la bd");
      }
      return true;
    }),
];
