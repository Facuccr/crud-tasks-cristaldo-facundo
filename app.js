import { initDB } from "./src/config/database.js";
import express from "express";
import dotenv from "dotenv";

import userRouter from "./src/routes/user.routes.js";
import taskRouter from "./src/routes/task.routes.js";
import { task_model } from "./src/models/task.model.js";
import { user_model } from "./src/models/user.model.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

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

app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});
