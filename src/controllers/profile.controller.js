import { matchedData } from "express-validator";
import { UserProfileModel } from "../models/user.profile.model.js";

export const getAllProfiles = async (req, res) => {
  try {
    const profiles = await UserProfileModel.findAll({
      include: [
        {
          model: UserProfileModel.sequelize.models.user_model,
          as: "user",
          attributes: ["id", "name", "email"],
        },
      ],
    });
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProfileById = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const profile = await UserProfileModel.findByPk(id, {
      include: [
        {
          model: UserProfileModel.sequelize.models.user_model,
          as: "user",
          attributes: ["id", "name", "email"],
        },
      ],
    });
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProfile = async (req, res) => {
  try {
    const data = matchedData(req);
    const profile = await UserProfileModel.create({
      user_id: data.user_id,
      phone: data.phone,
      address: data.address,
    });
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const data = matchedData(req);
    const profile = await UserProfileModel.findByPk(id);
    await profile.update(data);
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const profile = await UserProfileModel.findByPk(id);
    await profile.destroy();
    res.status(200).json({ message: "perfil eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
