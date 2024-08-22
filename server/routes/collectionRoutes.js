import express from "express";
import { jwtCheck } from "../middleware/authMiddleware.js";
import {
  handleCreateCollection,
  handleGetAllCollection,
  handleGetSingleCollection,
  handleUpdateCollection,
  handleDeleteCollection,
  handleGetTopCollection,
  handleGetMyCollection,
} from "../controller/collectionController.js";

const router = express.Router();

router.post("/", jwtCheck, handleCreateCollection);
router.get("/", handleGetAllCollection);
router.get("/top", handleGetTopCollection);
router.get("/myColections", jwtCheck, handleGetMyCollection);
router.get("/:id", handleGetSingleCollection);
router.put("/:id", jwtCheck, handleUpdateCollection);
router.delete("/:id", jwtCheck, handleDeleteCollection);

export { router as collectionRoute };
