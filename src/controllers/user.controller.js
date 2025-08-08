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
      .json({ message: "error al crear el Usuario", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  try {
    if (!user) {
      return res.status(404).json({ message: "el usuario no existe" });
    }
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Los campos no pueden estar vacíos",
      });
    }

    const verificarEmail = await User.findOne({ where: { email } });
    if (verificarEmail && verificarEmail.id !== user.id) {
      return res
        .status(400)
        .json({ message: "ya existe un usuario con este email" });
    }

    if (name !== undefined && typeof name !== "string") {
      return res.status(400).json({
        message: "el nombre solamente puede ser string.",
      });
    }
    if (email !== undefined && typeof email !== "string") {
      return res.status(400).json({
        message: "el email solamente puede ser string",
      });
    }

    if (name != undefined) user.name = name;
    if (email != undefined) user.email = email;
    if (password != undefined) user.password = password;
    await user.save();
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
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    await user.destroy();
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al borrar el usuario", error: error.message });
  }
};
