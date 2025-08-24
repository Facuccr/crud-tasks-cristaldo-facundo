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

export const getUserRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const relation = await UserRole.findByPk(id, {
      where: { id },
      attributes: {
        exclude: ["user_id", "role_id"],
      },

      include: [
        {
          model: user_model,
          as: "user",
          attributes: { exclude: ["password", "id"] },
        },
        {
          model: role_model,
          as: "role",
          attributes: { exclude: ["id"] },
        },
      ],
    });
    if (!relation) {
      return res
        .status(404)
        .json({ message: "Relacion usuario-rol no encontrada" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener la relacion usuario-rol",
      error: error.message,
    });
  }
};

export const getAllUserRoles = async (req, res) => {
  try {
    const roles = await UserRole.findAll({
      attributes: {
        exclude: ["user_id", "role_id"],
      },
      include: [
        {
          model: user_model,
          as: "user",
          attributes: {
            exclude: ["password", "id"],
          },
        },
        {
          model: role_model,
          as: "role",
          attributes: {
            exclude: ["id"],
          },
        },
      ],
    });

    res.json(roles);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error al obtener los usuarios", error: error.message });
  }
};
export const updateUserRole = async (req, res) => {
  try {
    const user_role = await UserRole.findByPk(req.params.id);
    if (user_role) {
      await UserRole.update(req.body, { where: { id: req.params.id } });
      return res.status(201).json({
        message: "actualizado correcteamnte",
      });
    } else {
      return res.status(400).json({
        message: "el id proporcionado no existe en la base de datos",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "ocurrio un error en el servidor",
      err: err.message,
    });
  }
};

export const deleteUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const relation = await UserRole.findOne({ where: { id } });

    if (!relation) {
      return res
        .status(404)
        .json({ message: "realcion usuario.rol no encontrada" });
    }

    await relation.destroy();

    res.json({ message: "relacion usuario-rol eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({
      message: "error al eliminar la relacion",
      error: error.message,
    });
  }
};
