import { initDB } from "./src/config/database.js";
import express from "express";
import dotenv from "dotenv";
import userRouter from "./src/routes/user.routes.js";
import taskRouter from "./src/routes/task.routes.js";
import profileRouter from "./src/routes/profile.routes.js";
import roleRouter from "./src/routes/role.routes.js";
import user_roleRouter from "./src/routes/user_roles.routes.js";
import { task_model } from "./src/models/task.model.js";
import { user_model } from "./src/models/user.model.js";
import { role_model } from "./src/models/role.model.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get("/api/tasks/", async (req, res) => {
  try {
    const tasks = await task_model.findAll({
      attributes: {
        exclude: ["user_id"],
      },
      include: [
        {
          model: user_model,
          as: "responsible",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    return res.json(tasks);
  } catch (error) {
    return res.status(500).json({
      message: "error al obtener las tareas",
      error: error.message,
    });
  }
});

app.get("/api/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const task = await task_model.findOne({
      where: { id: id },
      attributes: {
        exclude: ["user_id"],
      },
      include: [
        {
          model: user_model,
          as: "responsible",
          attributes: ["id", "name", "email"],
        },
      ],
    });

    if (!task) {
      return res.status(404).json({ message: "tarea no encontrada." });
    }

    return res.json(task);
  } catch (error) {
    return res.status(500).json({
      message: "error al obtener la tarea.",
      error: error.message,
    });
  }
});
app.get("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user_task = await user_model.findOne({
      where: { id: id },
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: task_model,
          as: "task",
          attributes: ["id", "title", "description", "isComplete"],
        },
      ],
    });
    if (!user_task) {
      return res.status(404).json({ message: "el usuario no existe" });
    }
    return res.json(user_task);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error al obtener al usuario", error: error.message });
  }
});
app.get("/api/users", async (req, res) => {
  try {
    const users = await user_model.findAll({
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: task_model,
          as: "task",
          attributes: ["id", "title", "description", "isComplete"],
        },
        {
          model: role_model,
          as: "roles",
          attributes: ["name"],
        },
      ],
    });
    return res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error al obtener los usuarios", error: error.message });
  }
});

app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/profiles", profileRouter);
app.use("/api/roles", roleRouter);
app.use("/api/assing", user_roleRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});
