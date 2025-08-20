import { role_model } from "../models/role.model.js";
import { user_model } from "../models/user.model.js";
import { UserRole } from "../models/user_role.model.js";

export const createUserRole = async (req, res) => {
  try {
    const { user_id, role_id } = req.body;
    //verificar que el rol realmente exista en la bd
    const verificarRole = await role_model.findOne({ where: { id: role_id } });
    if (!verificarRole) {
      return res.status(400).json({ message: "el rol no existe" });
    }

    //verificar que el usuario exista
    const verificarUsuario = await user_model.findOne({
      where: { id: user_id },
    });
    if (!verificarUsuario) {
      return res
        .status(400)
        .json({ message: "no se encontro el usuario con el id proporsionado" });
    }
    //verificar que el usuario no tenga ese rol asignado previamente
    const existeRelacion = await UserRole.findOne({
      where: { user_id: user_id, role_id: role_id },
    });
    if (existeRelacion) {
      return res.status(400).json({
        message: "ese rol ya fue asignado a este usuario",
      });
    }
    const relation = await UserRole.create({
      user_id: user_id,
      role_id: role_id,
    });
    res.json(relation);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error al asignar el rol", error: error.message });
  }
};

export const getAllUserRoles = async (req, res) => {
  try {
    const roles = await UserRole.findAll();
    res.json(roles);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error al obtener los usuarios", error: error.message });
  }
};
