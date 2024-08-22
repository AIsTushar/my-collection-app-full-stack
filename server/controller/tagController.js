import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

// Handle Tag Creation
export const handleCreateTag = asyncHandler(async (req, res) => {
  const tag = await prisma.tag.create({
    data: { name: req.body.name },
  });
  res.json(tag);
});

// Handle Get All Tag
export const handleGetAllTag = asyncHandler(async (req, res) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
});

// Get Tag Cloud
export const handleGetTagCloud = asyncHandler(async (req, res) => {
  const tags = await prisma.tag.findMany({
    take: 6,
    select: {
      id: true,
      name: true,
      _count: {
        select: { items: true },
      },
    },
    orderBy: { items: { _count: "desc" } },
  });
  res.json(tags);
});
