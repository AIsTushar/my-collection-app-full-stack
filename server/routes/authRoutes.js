import express from "express";
import { handleSignup, getUserData } from "../controller/authController.js";
import { jwtCheck } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/signup", jwtCheck, handleSignup);
router.get("/me", jwtCheck, getUserData);

export { router as authRoute };
