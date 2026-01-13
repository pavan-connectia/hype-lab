"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAdmin = exports.updateAdmin = exports.getAdminById = exports.getAllAdmins = exports.createAdmin = void 0;
const admin_model_1 = __importDefault(require("../models/admin.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const exists = await admin_model_1.default.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: "Admin already exists" });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const admin = await admin_model_1.default.create({
            name,
            email,
            password: hashedPassword,
            role: "admin",
            mustChangePassword: true,
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
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create admin" });
    }
};
exports.createAdmin = createAdmin;
const getAllAdmins = async (_req, res) => {
    try {
        const admins = await admin_model_1.default.find({ role: "admin", isActive: true }).select("-password");
        res.json(admins);
    }
    catch {
        res.status(500).json({ message: "Failed to fetch admins" });
    }
};
exports.getAllAdmins = getAllAdmins;
const getAdminById = async (req, res) => {
    try {
        const admin = await admin_model_1.default.findById(req.params.id).select("-password");
        if (!admin || !admin.isActive) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.json(admin);
    }
    catch {
        res.status(500).json({ message: "Failed to fetch admin" });
    }
};
exports.getAdminById = getAdminById;
const updateAdmin = async (req, res) => {
    try {
        const { name, email, isActive, password } = req.body;
        const updateData = { name, email, isActive };
        // ✅ Only update password if provided
        if (password && password.trim() !== "") {
            const hashed = await bcryptjs_1.default.hash(password, 10);
            updateData.password = hashed;
        }
        const admin = await admin_model_1.default.findByIdAndUpdate(req.params.id, updateData, { new: true }).select("-password");
        if (!admin)
            return res.status(404).json({ message: "Admin not found" });
        res.json({
            message: "Admin updated successfully",
            admin,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to update admin" });
    }
};
exports.updateAdmin = updateAdmin;
const deleteAdmin = async (req, res) => {
    try {
        // for hard delete
        const admin = await admin_model_1.default.findByIdAndDelete(req.params.id);
        //for soft delete , isActive=false, user not deleted parmanently
        // const admin = await Admin.findByIdAndUpdate(
        //   req.params.id,
        //   { isActive: false },
        //   { new: true }
        // );
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.json({ message: "Admin deleted successfully" });
    }
    catch {
        res.status(500).json({ message: "Failed to delete admin" });
    }
};
exports.deleteAdmin = deleteAdmin;
//# sourceMappingURL=admin.manage.controller.js.map