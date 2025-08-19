import { role_model } from "../models/role.model.js";
import { user_model } from "../models/user.model.js";
import { UserRole } from "../models/user_role.model.js";

export const createUserRole = async (req, res) => {
  try {
    const { user_id, role_id } = req.body;

    const verificarRole = await role_model.findOne({ where: { id: role_id } });
    if (!verificarRole) {
      return res.status(400).json({ message: "el rol no existe" });
    }
    const verificarUsuario = await user_model.findOne({
      where: { id: user_id },
    });
    if (verificarRole) {
      return res
        .status(400)
        .json({ message: "ya se a asignado este rol al usuario especificado" });
    }
    if (!verificarUsuario) {
      return res
        .status(400)
        .json({ message: "no se encontro el usuario con el id proporsionado" });
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
