import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { user_model } from "./user.model.js";
export const task_model = sequelize.define(
  "Task",
  {
    title: { type: DataTypes.STRING(100), unique: true, allowNull: false },
    description: { type: DataTypes.STRING(100), allowNull: false },
    isComplete: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    timestamps: false,
  }
);

//una tarea pertenece a un unico usuario
task_model.belongsTo(user_model, { foreignKey: "user_id", as: "responsible" });

// un usuario tiene muchas tareas
user_model.hasMany(task_model, { foreignKey: "user_id" });
