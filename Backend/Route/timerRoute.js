import express from "express";
import { saveTimerSession, getTimerSessions, getStudyHistory, getDailyGoal } from "../controller/timerController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/save", authMiddleware, saveTimerSession);
router.get("/history", authMiddleware, getTimerSessions);
router.get("/study-history", authMiddleware, getStudyHistory);
router.get("/daily-goal", authMiddleware, getDailyGoal);

export default router; 