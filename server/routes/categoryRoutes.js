import express from "express";

import { jwtCheck } from "../middleware/authMiddleware.js";
import {
  handleCreateCategory,
  handleGetAllCategory,
} from "../controller/categoriesController.js";
const router = express.Router();

router.post("/", handleCreateCategory);
router.get("/", handleGetAllCategory);

export { router as categoryRoute };
