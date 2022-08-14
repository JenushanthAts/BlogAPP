import express from "express";
import {
  createPost,
  fetchBlogs,
  fetchBlogByID,
  deleteBlog,
} from "../controller/blogController.js";
const router = express.Router();

router.post("/createPost", createPost); //http://localhost:3600/api/register
router.get("/fetchBlogs", fetchBlogs); ////http://localhost:3600/api/signin
router.get("/fetBlogByID/:id", fetchBlogByID);
router.delete("/deletBlog/:id", deleteBlog);

export default router;
