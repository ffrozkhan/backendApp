import express from "express";
import { getUserTasksController } from "../controllers/tasksController.js";
import { isLoggedIn } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.get("/", isLoggedIn, getUserTasksController);

export default router;
