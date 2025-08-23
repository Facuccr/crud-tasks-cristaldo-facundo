import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { user_model } from "./user.model.js";

export const UserProfileModel = sequelize.define(
  "User_Profile",
  {
    phone: { type: DataTypes.STRING, allowNull: true },
    address: { type: DataTypes.STRING, allowNull: true },
  },
  {
    timestamps: false,
  }
);

//si se elimina un usuario, su relacion con el perfil tambien---------------

//relacion 1 a 1
user_model.hasOne(UserProfileModel, {
  foreignKey: "user_id",
  as: "profile",
  onDelete: "CASCADE",
});
UserProfileModel.belongsTo(user_model, {
  foreignKey: "user_id",
  as: "user",
  onDelete: "CASCADE",
});
