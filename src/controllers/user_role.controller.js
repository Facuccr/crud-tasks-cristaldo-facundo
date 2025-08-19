// controllers/user_role.controller.js
import { UserRole } from "../models/user_role.model.js";

export const createUserRole = async (req, res) => {
  try {
    const { user_id, role_id } = req.body;

    const relation = await UserRole.create({
      user_id: user_id,
      role_id: role_id,
    });

    res.json({ message: "Rol asignado correctamente", relation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUserRoles = async (req, res) => {
  try {
    const roles = await UserRole.findAll();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: "error papu", error: error.message });
  }
};
