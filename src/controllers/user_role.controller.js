import { matchedData } from "express-validator";
import { role_model } from "../models/role.model.js";
import { user_model } from "../models/user.model.js";
import { UserRole } from "../models/user_role.model.js";

export const createUserRole = async (req, res) => {
  try {
    const data = matchedData(req);

    console.log(data);
    const relation = await UserRole.create(data);
    res.json({ msg: "relacion creada", relation });
  } catch (error) {
    console.log(error);
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
    res.status(200).json({ relation });
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

    await relation.destroy();

    res.json({ message: "relacion usuario-rol eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({
      message: "error al eliminar la relacion",
      error: error.message,
    });
  }
};
