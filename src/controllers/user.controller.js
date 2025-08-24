import { user_model } from "../models/user.model.js";
import { task_model } from "../models/task.model.js";
import { matchedData } from "express-validator";

export const getAllUser = async (req, res) => {
  try {
    const users = await user_model.findAll({
      attributes: { exclude: ["password"] },
      include: [{ model: task_model, as: "task" }],
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "error al obtener todos los usuarios",
      error: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = await user_model.findByPk(id, {
      attributes: { exclude: ["password"] },
      include: [{ model: task_model, as: "task" }],
    });
    res.status(200).json(userId);
  } catch (error) {
    res.status(500).json({
      message: "error al obtener el usuario",
      error: error.message,
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const data = matchedData(req);

    const newUser = await user_model.create(data);

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "error al crear el Usuario", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await user_model.findByPk(id);
    const data = matchedData(req);

    await user.update(data);
    res
      .status(200)
      .json({ message: "usuario actualizado correctamente", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error al editar el usuario", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = matchedData(req);

    const user = await user_model.findByPk(id);

    //elimino logicamente las tareas del usuario
    await task_model.destroy({
      where: { user_id: id },
    });
    //luego de eliminar las tareas, elimino al usuario
    await user.destroy();
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al borrar el usuario", error: error.message });
  }
};
