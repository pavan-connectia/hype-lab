"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_controller_1 = require("../controllers/blog.controller");
const router = (0, express_1.Router)();
// READ
router.get("/blogs", blog_controller_1.getBlogs);
router.get("/case-studies", blog_controller_1.getCaseStudies);
//READ by ID
router.get("/posts/:id", blog_controller_1.getPostById);
// CREATE
router.post("/blogcase", blog_controller_1.createPost);
// UPDATE
router.put("/blogcase/:id", blog_controller_1.updatePost);
// DELETE
router.delete("/blogcase/:id", blog_controller_1.deletePost);
exports.default = router;
//# sourceMappingURL=blog.routes.js.map