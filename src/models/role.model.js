import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { user_model } from "./user.model.js";
import { UserRole } from "./user_role.model.js";
export const role_model = sequelize.define(
  "Role",
  {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  { timestamps: false }
);
//relacion entre user y roles hacia la tabla intermedia User_roles
user_model.belongsToMany(role_model, {
  through: UserRole,
  foreignKey: "user_id",
  as: "user",
  sourceKey: "id",
  onDelete: "CASCADE",
});
role_model.belongsToMany(user_model, {
  through: UserRole,
  foreignKey: "role_id",
  as: "role",
  targetKey: "id",
  onDelete: "CASCADE",
});

//config para obtener los datos desde otras tablas
UserRole.belongsTo(user_model, {
  foreignKey: "user_id",
  as: "user",
});

UserRole.belongsTo(role_model, {
  foreignKey: "role_id",
  as: "role",
});
