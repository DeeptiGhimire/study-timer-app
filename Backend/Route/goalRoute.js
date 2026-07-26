import express from "express";
import { setGoal, getGoal } from "../controller/goalController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/get", authMiddleware, getGoal);
router.post("/set", authMiddleware, setGoal);

export default router; 