import express from "express";
import { jwtCheck } from "../middleware/authMiddleware.js";
import {
  handleCreateTag,
  handleGetAllTag,
  handleGetTagCloud,
} from "../controller/tagController.js";

const routes = express.Router();

routes.post("/", handleCreateTag);
routes.get("/", handleGetAllTag);
routes.get("/cloud", handleGetTagCloud);

export { routes as tagRoute };
