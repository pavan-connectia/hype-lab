import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import blogRoutes from "./routes/blog.routes";
import adminAuthRoutes from "./routes/admin.routes";
import adminManageRoutes from "./routes/admin.manage.routes";
import { Request, Response } from "express";

dotenv.config();

const app = express();

// Middlewares
app.use(
    cors({
        origin: ["http://localhost:5173", "http://localhost:5174","https://hype-lab.vercel.app","https://hype-lab-admin.vercel.app"],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true,
    })
);

app.get("/api", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "API is running successfully",
    });
});

app.use(express.json());

app.get

app.use("/api/admin", adminAuthRoutes);
app.use("/api/admin/manage", adminManageRoutes);
app.use("/api", blogRoutes);

export default app;