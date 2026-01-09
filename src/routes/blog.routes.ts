import { Router } from "express";
import { getBlogs, getCaseStudies, createPost, updatePost, deletePost, getPostById} from "../controllers/blog.controller";

const router = Router();

// READ
router.get("/blogs", getBlogs);
router.get("/case-studies", getCaseStudies);

//READ by ID
router.get("/posts/:id", getPostById);

// CREATE
router.post("/blogcase", createPost);

// UPDATE
router.put("/blogcase/:id", updatePost);

// DELETE
router.delete("/blogcase/:id", deletePost);

export default router;