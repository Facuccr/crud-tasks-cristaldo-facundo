import { INTEGER } from "sequelize";
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

export const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await role_model.findByPk(id);
    if (!role) {
      return res.status(404).json({ message: "el rol no fue encontrado" });
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({
      message: "error al obtener el rol",
      error: error.message,
    });
  }
};

export const getAllRoles = async (req, res) => {
  try {
    const roles = await role_model.findAll({});
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await role_model.findByPk(id);

    if (!role) {
      return res.status(404).json({ msg: "El rol a borrar no existe :/" });
    }

    await role.destroy();
    res.status(200).json({ msg: "rol eliminado correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "error interno en el servidor",
      error: error.message,
    });
  }
};

export const updateRol = async (req, res) => {
  const { id } = req.params;
  const role = await role_model.findByPk(id);
  try {
    const { name } = req.body;
    if (!role) {
      return res.status(404).json({ message: "el rol no existe" });
    }

    const verificarRole = await role_model.findOne({ where: { name } });
    if (verificarRole) {
      return res.status(400).json({
        message: "ya existe una tarea con este titulo",
      });
    }
    role.name = name;
    await role.save();
    res.status(200).json({ message: "rol actualizado correctamente", role });
  } catch (error) {
    res.status(500).json({
      message: "error interno del sv",
      error: error.message,
    });
  }
};
