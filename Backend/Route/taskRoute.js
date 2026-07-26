import express from "express";
import { addTask, getTasks, updateTask, deleteTask } from "../controller/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, addTask);
router.get("/all", authMiddleware, getTasks);
router.put("/update/:id", authMiddleware, updateTask);
router.delete("/delete/:id", authMiddleware, deleteTask);

export default router; 