"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.createPost = exports.getPostById = exports.getCaseStudies = exports.getBlogs = void 0;
const blog_model_1 = __importDefault(require("../models/blog.model"));
// GET - Blogs
const getBlogs = async (req, res) => {
    try {
        const blogs = await blog_model_1.default.find({ type: "blog" }).sort({ createdAt: -1 });
        res.status(200).json(blogs);
    }
    catch {
        res.status(500).json({ message: "Failed to fetch blogs" });
    }
};
exports.getBlogs = getBlogs;
// GET - Case Studies
const getCaseStudies = async (req, res) => {
    try {
        const caseStudies = await blog_model_1.default.find({ type: "case-study" });
        res.status(200).json(caseStudies);
    }
    catch {
        res.status(500).json({ message: "Failed to fetch case studies" });
    }
};
exports.getCaseStudies = getCaseStudies;
// GET - Single Post by ID
const getPostById = async (req, res) => {
    try {
        const post = await blog_model_1.default.findById(req.params.id);
        if (!post) {
            res.status(404).json({ message: "Post not found" });
            return;
        }
        res.status(200).json(post);
    }
    catch {
        res.status(400).json({ message: "Failed to fetch post" });
    }
};
exports.getPostById = getPostById;
// POST - Create Blog / Case Study
const createPost = async (req, res) => {
    try {
        const post = await blog_model_1.default.create(req.body);
        res.status(201).json(post);
    }
    catch {
        res.status(400).json({ message: "Post creation failed" });
    }
};
exports.createPost = createPost;
// PUT - Update Post
const updatePost = async (req, res) => {
    try {
        const updated = await blog_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) {
            res.status(404).json({ message: "Post not found" });
            return;
        }
        res.status(200).json(updated);
    }
    catch {
        res.status(400).json({ message: "Update failed" });
    }
};
exports.updatePost = updatePost;
// DELETE - Remove Post
const deletePost = async (req, res) => {
    try {
        const deleted = await blog_model_1.default.findByIdAndDelete(req.params.id);
        if (!deleted) {
            res.status(404).json({ message: "Post not found" });
            return;
        }
        res.status(200).json({ message: "Post deleted successfully" });
    }
    catch {
        res.status(400).json({ message: "Delete failed" });
    }
};
exports.deletePost = deletePost;
//# sourceMappingURL=blog.controller.js.map