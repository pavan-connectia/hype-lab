"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = void 0;
const admin_model_1 = __importDefault(require("../models/admin.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // 1️⃣ Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }
        // 2️⃣ Find active admin
        const admin = await admin_model_1.default.findOne({ email, isActive: true });
        if (!admin) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // 3️⃣ Compare password
        const isMatch = await bcryptjs_1.default.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // 🔥 4️⃣ FORCE PASSWORD CHANGE CHECK
        if (admin.mustChangePassword) {
            return res.status(403).json({
                message: "Password change required",
                forceChangePassword: true,
                adminId: admin._id,
            });
        }
        // 5️⃣ Generate JWT (only if password is final)
        const token = jsonwebtoken_1.default.sign({ id: admin._id, name: admin.name, role: admin.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
        // 6️⃣ Success response
        res.json({
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
            },
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Login failed" });
    }
};
exports.adminLogin = adminLogin;
//# sourceMappingURL=admin.controller.js.map