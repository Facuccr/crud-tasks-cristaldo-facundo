import { initDB } from "./src/config/database.js";
import express from "express";
import dotenv from "dotenv";
import userRouter from "./src/routes/user.routes.js";
import taskRouter from "./src/routes/task.routes.js";
import profileRouter from "./src/routes/profile.routes.js";
import roleRouter from "./src/routes/role.routes.js";
import user_roleRouter from "./src/routes/user_roles.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

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
