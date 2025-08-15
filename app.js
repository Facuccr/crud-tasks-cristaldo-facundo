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

app.get("api/tasks/user_id", async (req, res) => {
  try {
  } catch (error) {}
});

app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await task_model.findAll({
      attributes: {
        exclude: ["user_id", "isComplete"],
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
      message: "Error al obtener las tareas.",
      error,
    });
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
