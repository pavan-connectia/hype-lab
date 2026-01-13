"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeAdminPassword = void 0;
const admin_model_1 = __importDefault(require("../models/admin.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const changeAdminPassword = async (req, res) => {
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
        const admin = await admin_model_1.default.findById(adminId);
        if (!admin || !admin.isActive) {
            return res.status(404).json({ message: "Admin not found" });
        }
        const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
        admin.password = hashedPassword;
        admin.mustChangePassword = false;
        await admin.save();
        res.json({
            message: "Password changed successfully. Please login again.",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to change password" });
    }
};
exports.changeAdminPassword = changeAdminPassword;
//# sourceMappingURL=changeAdminPassword.controller.js.map