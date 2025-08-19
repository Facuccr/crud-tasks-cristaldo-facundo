import { UserProfileModel } from "../models/user.profile.model.js";
import { user_model } from "../models/user.model.js";

export const createProfile = async (req, res) => {
  try {
    const { user_id, phone, address } = req.body;

    const user = await user_model.findByPk(user_id);
    if (!user)
      return res.status(404).json({ message: "usuario no encontrado" });

    const existProfile = await UserProfileModel.findOne({
      where: { user_id },
    });
    if (existProfile)
      return res.status(400).json({ message: "el usuario ya tiene un perfil" });

    const profile = await UserProfileModel.create({ user_id, phone, address });
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await UserProfileModel.findAll({
      include: [
        {
          model: user_model,
          as: "user",
          attributes: ["id", "name", "email"],
        },
      ],
    });
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
