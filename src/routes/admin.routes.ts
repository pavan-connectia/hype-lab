import { Router } from "express";
import { adminLogin } from "../controllers/admin.controller";
import { changeAdminPassword } from "../controllers/changeAdminPassword.controller";

const router = Router();

// Admin login
router.post("/login", adminLogin);

// First-time password change
router.post("/change-password", changeAdminPassword);

export default router;
