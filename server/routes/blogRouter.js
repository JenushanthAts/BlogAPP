import express from "express";
import {
  createPost,
  fetchBlogs,
  fetchBlogByID,
  deleteBlog,
  updateBlog,
} from "../controller/blogController.js";
import VerifyToken from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/createPost", createPost); //http://localhost:3600/api/register
router.get("/fetchBlogs", fetchBlogs); ////http://localhost:3600/api/signin
router.get("/fetBlogByID/:id", fetchBlogByID);
//protected routes
router.put("/updateBlog/:id", VerifyToken, updateBlog); //verifytoken is a middleware to checking whether user is authneticated or not
router.delete("/deleteBlog/:id", deleteBlog);

export default router;
