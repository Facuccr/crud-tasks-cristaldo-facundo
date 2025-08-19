import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { user_model } from "./user.model.js";

export const role_model = sequelize.define(
  "Role",
  {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  { timestamps: false }
);

user_model.belongsToMany(role_model, {
  through: "user_roles",
  as: "roles",
  foreignKey: "user_id",
});
role_model.belongsToMany(user_model, {
  through: "user_roles",
  as: "users",
  foreignKey: "role_id",
});
