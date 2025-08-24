import { matchedData } from "express-validator";
import { role_model } from "../models/role.model.js";

export const getAllRoles = async (req, res) => {
  try {
    const roles = await role_model.findAll();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRoleById = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const role = await role_model.findByPk(id);
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createRole = async (req, res) => {
  try {
    const data = matchedData(req);
    const role = await role_model.create({ name: data.name });
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const data = matchedData(req);
    const role = await role_model.findByPk(id);
    await role.update({ name: data.name });
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRole = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const role = await role_model.findByPk(id);
    await role.destroy();
    res.status(200).json({ message: "rol eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
