"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const changeAdminPassword_controller_1 = require("../controllers/changeAdminPassword.controller");
const router = (0, express_1.Router)();
// Admin login
router.post("/login", admin_controller_1.adminLogin);
// First-time password change
router.post("/change-password", changeAdminPassword_controller_1.changeAdminPassword);
exports.default = router;
//# sourceMappingURL=admin.routes.js.map