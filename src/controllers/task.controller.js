import { matchedData } from "express-validator";
import { task_model } from "../models/task.model.js";
import { user_model } from "../models/user.model.js";

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await task_model.findAll({
      attributes: { exclude: ["user_id"] },
      include: [
        {
          model: user_model,
          as: "responsible",
          attributes: ["id", "name", "email"],
        },
      ],
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "error al obtener todas las tareas",
      error: error.message,
    });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const task = await task_model.findByPk(id, {
      attributes: { exclude: ["user_id"] },
      include: [
        {
          model: user_model,
          as: "responsible",
          attributes: ["id", "name", "email"],
        },
      ],
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: "error al obtener la tarea",
      error: error.message,
    });
  }
};

export const createTask = async (req, res) => {
  try {
    const data = matchedData(req);
    const newTask = await task_model.create({
      title: data.title,
      description: data.description,
      isComplete: data.isComplete,
      user_id: data.userId,
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({
      message: "error al crear la tarea",
      error: error.message,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const data = matchedData(req);

    const task = await task_model.findByPk(id);

    await task.update(data);
    res.status(200).json({ message: "tarea actualizada correctamente", task });
  } catch (error) {
    res.status(500).json({
      message: "error al editar la tarea",
      error: error.message,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const task = await task_model.findByPk(id);

    await task.destroy();
    res.status(200).json({ message: "tarea eliminada correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "error al borrar la tarea",
      error: error.message,
    });
  }
};
