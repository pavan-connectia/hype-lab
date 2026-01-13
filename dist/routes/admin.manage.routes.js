"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_manage_controller_1 = require("../controllers/admin.manage.controller");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// 🔐 All routes are protected & super-admin only
router.use(auth_1.protect, auth_1.superAdminOnly);
router.post("/", admin_manage_controller_1.createAdmin);
router.get("/", admin_manage_controller_1.getAllAdmins);
router.get("/:id", admin_manage_controller_1.getAdminById);
router.put("/:id", admin_manage_controller_1.updateAdmin);
router.delete("/:id", admin_manage_controller_1.deleteAdmin);
exports.default = router;
//# sourceMappingURL=admin.manage.routes.js.map