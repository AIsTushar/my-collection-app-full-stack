import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";
import { getUser } from "../Helper/helper.js";

// Handler to create a new collection
export const handleCreateCollection = asyncHandler(async (req, res) => {
  const user = await getUser(req.auth.payload.sub);
  const collection = await prisma.collection.create({
    data: { ...req.body, userId: user.id },
  });
  res.json(collection);
});

// Handle to Get All collection
export const handleGetAllCollection = asyncHandler(async (req, res) => {
  try {
    const collections = await prisma.collection.findMany({
      include: { user: true, category: true },
    });
    res.json(collections);
  } catch (error) {
    res.status(500).json({ error: "Error fetching collections" });
  }
});

// Handle to Get Single Collection
export const handleGetSingleCollection = asyncHandler(async (req, res) => {
  const collection = await prisma.collection.findUnique({
    where: { id: parseInt(req.params.id) },
    include: {
      user: { select: { name: true } },
      category: true,
      items: {
        select: {
          id: true,
          name: true,
          tags: {
            select: {
              name: true,
            },
          },
          collection: {
            select: {
              name: true,
              imageUrl: true,
              user: {
                select: {
                  name: true,
                },
              },
            },
          },

          likes: true,
        },
      },
      category: {
        select: {
          collections: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });
  if (!collection)
    return res.status(404).json({ error: "Collection not found" });
  res.json(collection);
});

// Handle to Get Top Collections
export const handleGetTopCollection = asyncHandler(async (req, res) => {
  const collections = await prisma.collection.findMany({
    take: 5,
    orderBy: {
      items: {
        _count: "desc",
      },
    },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      createdAt: true,
      _count: {
        select: { items: true },
      },
    },
  });

  res.send({ message: "Top Collections", collections });
});

// Handle to Update Collection
export const handleUpdateCollection = asyncHandler(async (req, res) => {
  const user = await getUser(req.auth.payload.sub);

  const collection = await prisma.collection.findUnique({
    where: { id: parseInt(req.params.id) },
  });

  if (!collection) {
    return res.status(404).json({ error: "Collection not found" });
  }

  if (collection.userId !== user.id) {
    return res
      .status(403)
      .json({ error: "You are not authorized to update this collection" });
  }

  const updatedCollection = await prisma.collection.update({
    where: { id: parseInt(req.params.id) },
    data: req.body,
  });

  res.json(updatedCollection);
});

// Handle to Delete Collection
export const handleDeleteCollection = asyncHandler(async (req, res) => {
  const user = await getUser(req.auth.payload.sub);

  const collection = await prisma.collection.findUnique({
    where: { id: parseInt(req.params.id) },
  });

  if (!collection) {
    return res.status(404).json({ error: "Collection not found" });
  }

  if (collection.userId !== user.id) {
    return res
      .status(403)
      .json({ error: "You are not authorized to update this collection" });
  }

  await prisma.collection.delete({
    where: { id: parseInt(req.params.id) },
  });

  res.json({ message: "Collection deleted successfully" });
});

// get my collections
export const handleGetMyCollection = asyncHandler(async (req, res) => {
  const user = await getUser(req.auth.payload.sub);
  // const collections = await prisma.collection.findMany({
  //   where: { userId: user.id },
  //   select: {
  //     id: true,
  //     name: true,
  //     imageUrl: true,
  //     createdAt: true,
  //     _count: {
  //       select: { items: true },
  //     },
  //   },
  // });

  const collections = await prisma.collection.findMany({
    where: { userId: user.id },
    include: {
      _count: {
        select: { items: true },
      },
    },
  });

  // Return the collections
  res.status(200).json(collections);
});
