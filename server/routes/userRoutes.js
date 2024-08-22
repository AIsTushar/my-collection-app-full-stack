import express from "express";
const router = express.Router();
import {
  handleGetUserProfile,
  handleUpdateUser,
} from "../controller/userController.js";
import { jwtCheck } from "../middleware/authMiddleware.js";

// User Routes
router.get("/profile", jwtCheck, handleGetUserProfile);
router.put("/updateMe", jwtCheck, handleUpdateUser);

export { router as userRoute };
