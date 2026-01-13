"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const blog_routes_1 = __importDefault(require("./routes/blog.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const admin_manage_routes_1 = __importDefault(require("./routes/admin.manage.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "http://localhost:5174", "https://hype-lab.vercel.app", "https://hype-lab-admin.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
}));
app.get("/api", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API is running successfully",
    });
});
app.use(express_1.default.json());
app.get;
app.use("/api/admin", admin_routes_1.default);
app.use("/api/admin/manage", admin_manage_routes_1.default);
app.use("/api", blog_routes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map