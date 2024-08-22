import express from "express";
import { jwtCheck } from "../middleware/authMiddleware.js";
import {
  handleCreateItem,
  handleGetAllItem,
  handleGetSingleItem,
  handleUpdateItem,
  handleDeleteItem,
  handleCreateComment,
  handleGetAllComments,
  handleDeleteComment,
  handleCreateLike,
  handleDeleteLike,
  handleGetLatestItem,
  handleGetMyItems,
} from "../controller/itemController.js";

const router = express.Router();

// Item Routes
router.post("/", jwtCheck, handleCreateItem);
router.get("/", handleGetAllItem);
router.get("/latest", handleGetLatestItem);
router.get("/myItems", jwtCheck, handleGetMyItems);
router.get("/:id", handleGetSingleItem);
router.put("/:id", jwtCheck, handleUpdateItem);
router.delete("/:id", jwtCheck, handleDeleteItem);

// comment Routes
router.post("/:itemId/comments", jwtCheck, handleCreateComment);
router.get("/:itemId/comments", handleGetAllComments);
router.delete("/:itemId/comments/:commentId", jwtCheck, handleDeleteComment);

// like Routes
router.post("/:id/like", jwtCheck, handleCreateLike);
router.delete("/:id/unlike", jwtCheck, handleDeleteLike);

export { router as itemRoute };
