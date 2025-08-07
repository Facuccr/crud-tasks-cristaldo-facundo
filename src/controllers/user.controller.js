import User from "../models/user.model.js";

export const getAllUser = async (req, res) => {
  try {
    const users = await User.findAll();
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
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "el usuario no fue encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error al obtener el usuario", error: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "los campos no deben estar vacios" });
  }
  try {
    const verificarEmail = await User.findOne({ where: { email: email } });
    if (verificarEmail) {
      return res
        .status(400)
        .json({ message: "ya existe un usuario con este email" });
    }
    const newUser = await User.create({
      name,
      email,
      password,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error al crear el personaje", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = User.findByPk(id);
  if (!user) {
    return res.status(404).json({ message: "el personaje no existe" });
  }
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return "";
  }
  try {
  } catch (error) {}
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = User.findByPk(id);
    if (!id) {
      return res
        .status(400)
        .json({ message: "El personaje a borrar no existe" });
    }
    await user.destroy();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al borrar el personaje", error: error.message });
  }
};
