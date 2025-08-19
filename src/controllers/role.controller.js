import { role_model } from "../models/role.model.js";
import { user_model } from "../models/user.model.js";

export const createRole = async (req, res) => {
  try {
    const { name } = req.body;
    const role = await role_model.create({ name });
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllRoles = async (req, res) => {
  try {
    const roles = await role_model.findAll({
      include: [
        {
          model: user_model,
          as: "users",
          attributes: ["id", "name", "email"],
          through: { attributes: [] },
        },
      ],
    });
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
