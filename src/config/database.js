import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);
export const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexion exitosa con la BD");
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.log("error al conectar con la BD", error);
  }
};

export default sequelize;
