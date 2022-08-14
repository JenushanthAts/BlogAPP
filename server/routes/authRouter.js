import express from "express";
import { register, signin } from "../controller/authController.js";
const router = express.Router();

router.post("/register", register); //http://localhost:3600/api/register
router.post("/signin", signin); ////http://localhost:3600/api/signin

export default router;
