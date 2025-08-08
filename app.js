import express from "express";
import dotenv from "dotenv";
import { initDB } from "./src/config/database.js";

import userRouter from "./src/routes/user.routes.js";
import taskRouter from "./src/routes/task.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
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
