import Task from "../models/task.model.js";

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
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
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: "la tarea no fue encontrada" });
    }
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
    const { title, description, isComplete } = req.body;
    if (!title || !description || typeof isComplete !== "boolean") {
      return res.status(400).json({
        message:
          "los campos no deben estar vacios y iscomplete debe ser booleano",
      });
    }

    if (title.length > 100 || description.length > 100) {
      return res.status(400).json({
        message: "el titulo y la descripcion deben tener maximo 100 caracteres",
      });
    }
    const verificarTitulo = await Task.findOne({ where: { title } });
    if (verificarTitulo) {
      return res
        .status(400)
        .json({ message: "ya existe una tarea con este titulo" });
    }

    const newTask = await Task.create({
      title,
      description,
      isComplete,
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
  const { id } = req.params;
  const task = await Task.findByPk(id);

  try {
    if (!task) {
      return res.status(404).json({ message: "la tarea no existe" });
    }

    const { title, description, isComplete } = req.body;

    if (!title || !description || typeof isComplete !== "boolean") {
      return res.status(400).json({
        message:
          "los campos no deben estar vacios y iscomplete debe ser booleano",
      });
    }

    if (title.length > 100 || description.length > 100) {
      return res.status(400).json({
        message: "el titulo y la descripcion deben tener maximo 100 caracteres",
      });
    }

    const verificarTitulo = await Task.findOne({ where: { title } });
    if (verificarTitulo && verificarTitulo.id !== task.id) {
      return res.status(400).json({
        message: "ya existe una tarea con este titulo",
      });
    }

    task.title = title;
    task.description = description;
    task.isComplete = isComplete;

    await task.save();

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
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: "tarea no encontrada" });
    }

    await task.destroy();
    res.status(200).json({ message: "tarea eliminada correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "error al borrar la tarea",
      error: error.message,
    });
  }
};
