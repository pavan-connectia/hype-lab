import { Request, Response } from "express";
import Blog from "../models/blog.model";

// GET - Blogs
export const getBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogs = await Blog.find({ type: "blog" }).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch {
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
};

// GET - Case Studies
export const getCaseStudies = async (req: Request, res: Response): Promise<void> => {
  try {
    const caseStudies = await Blog.find({ type: "case-study" });
    res.status(200).json(caseStudies);
  } catch {
    res.status(500).json({ message: "Failed to fetch case studies" });
  }
};

// GET - Single Post by ID
export const getPostById = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Blog.findById(req.params.id);

    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    res.status(200).json(post);
  } catch {
    res.status(400).json({ message: "Failed to fetch post" });
  }
};

// POST - Create Blog / Case Study
export const createPost = async ( req: Request, res: Response ): Promise<void> => {
  try {
    const post = await Blog.create(req.body);
    res.status(201).json(post);
  } catch {
    res.status(400).json({ message: "Post creation failed" });
  }
};

// PUT - Update Post
export const updatePost = async (req: Request,res: Response): Promise<void> => {
  try {
    const updated = await Blog.findByIdAndUpdate(req.params.id,req.body,{ new: true });

    if (!updated) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    res.status(200).json(updated);
  } catch {
    res.status(400).json({ message: "Update failed" });
  }
};

// DELETE - Remove Post
export const deletePost = async (req: Request,res: Response): Promise<void> => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);

    if (!deleted) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch {
    res.status(400).json({ message: "Delete failed" });
  }
};
