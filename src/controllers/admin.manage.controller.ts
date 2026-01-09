import { Request, Response } from "express";
import Admin from "../models/admin.model";
import bcrypt from "bcryptjs";

export const createAdmin = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await Admin.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    res.status(201).json({
      message: "Admin created successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create admin" });
  }
};

export const getAllAdmins = async (_req: Request, res: Response) => {
  try {
    const admins = await Admin.find({ role: "admin", isActive: true }).select(
      "-password"
    );
    res.json(admins);
  } catch {
    res.status(500).json({ message: "Failed to fetch admins" });
  }
};

export const getAdminById = async (req: Request, res: Response) => {
  try {
    const admin = await Admin.findById(req.params.id).select("-password");

    if (!admin || !admin.isActive) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json(admin);
  } catch {
    res.status(500).json({ message: "Failed to fetch admin" });
  }
};

export const updateAdmin = async (req: Request, res: Response) => {
  try {
    const { name, email, isActive } = req.body;

    const admin = await Admin.findByIdAndUpdate(
      req.params.id,
      { name, email, isActive },
      { new: true }
    ).select("-password");

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({
      message: "Admin updated successfully",
      admin,
    });
  } catch {
    res.status(500).json({ message: "Failed to update admin" });
  }
};

export const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const admin = await Admin.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({ message: "Admin deleted successfully" });
  } catch {
    res.status(500).json({ message: "Failed to delete admin" });
  }
};
