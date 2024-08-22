import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

// Handle Category Creation
export const handleCreateCategory = asyncHandler(async (req, res) => {
  try {
    const category = await prisma.category.create({
      data: { name: req.body.name },
    });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Error creating category" });
  }
});

// Handle Get All Category
export const handleGetAllCategory = asyncHandler(async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Error fetching categories" });
  }
});
