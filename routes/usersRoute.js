import express from "express";
import {
  searchUsersController,
  getUserInfoController,
  deleteUserController,
  createUserController,
} from "../controllers/usersController.js";

const router = express.Router();

router.get("/", searchUsersController);
router.post("/", createUserController);
router.get("/:id", getUserInfoController);
router.delete("/:id", deleteUserController);

export default router;
