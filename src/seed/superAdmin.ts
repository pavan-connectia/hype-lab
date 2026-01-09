import Admin from "../models/admin.model";
import bcrypt from "bcryptjs";

export const createSuperAdmin = async () => {
  try {
    const exists = await Admin.findOne({ role: "super-admin" });
    if (exists) return;

    const email = process.env.SUPER_ADMIN_EMAIL;
    const password = process.env.SUPER_ADMIN_PASSWORD;

    if (!email || !password) {
      throw new Error("SUPER_ADMIN_EMAIL or SUPER_ADMIN_PASSWORD missing");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Admin.create({
      name: "Super Admin",
      email,
      password: hashedPassword,
      role: "super-admin",
    });

    console.log("✅ Super Admin created successfully");
  } catch (error) {
    console.error("❌ Failed to create Super Admin:", error);
  }
};
