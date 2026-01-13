import { Request, Response } from "express";
import Admin from "../models/admin.model";
import bcrypt from "bcryptjs";

export const changeAdminPassword = async (req: Request, res: Response) => {
  try {
    const { adminId, newPassword } = req.body;

    if (!adminId || !newPassword) {
      return res.status(400).json({
        message: "Admin ID and new password are required",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
      });
    }

    const admin = await Admin.findById(adminId);
    if (!admin || !admin.isActive) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    admin.password = hashedPassword;
    admin.mustChangePassword = false;
    await admin.save();

    res.json({
      message: "Password changed successfully. Please login again.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to change password" });
  }
};
