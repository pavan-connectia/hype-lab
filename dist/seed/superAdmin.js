"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSuperAdmin = void 0;
const admin_model_1 = __importDefault(require("../models/admin.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createSuperAdmin = async () => {
    try {
        const exists = await admin_model_1.default.findOne({ role: "super-admin" });
        if (exists)
            return;
        const email = process.env.SUPER_ADMIN_EMAIL;
        const password = process.env.SUPER_ADMIN_PASSWORD;
        if (!email || !password) {
            throw new Error("SUPER_ADMIN_EMAIL or SUPER_ADMIN_PASSWORD missing");
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        await admin_model_1.default.create({
            name: "Super Admin",
            email,
            password: hashedPassword,
            role: "super-admin",
            mustChangePassword: false,
        });
        console.log("✅ Super Admin created successfully");
    }
    catch (error) {
        console.error("❌ Failed to create Super Admin:", error);
    }
};
exports.createSuperAdmin = createSuperAdmin;
//# sourceMappingURL=superAdmin.js.map