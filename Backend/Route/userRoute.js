import express from "express";
import { registerUser, loginUser, updateUser } from "../controller/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/update", authMiddleware, updateUser);

export default router; 