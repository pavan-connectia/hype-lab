import { Router } from "express";
import {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
} from "../controllers/admin.manage.controller";
import { protect,superAdminOnly } from "../middleware/auth";

const router = Router();

// 🔐 All routes are protected & super-admin only
router.use(protect, superAdminOnly);

router.post("/", createAdmin);
router.get("/", getAllAdmins);
router.get("/:id", getAdminById);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);

export default router;
