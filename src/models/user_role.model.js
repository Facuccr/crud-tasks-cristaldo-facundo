import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const UserRole = sequelize.define(
  "user_roles",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
    timestamps: false,
  }
);
