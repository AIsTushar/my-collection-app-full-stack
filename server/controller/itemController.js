import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";
import { getUser } from "../Helper/helper.js";

// Handle Item Creation
export const handleCreateItem = asyncHandler(async (req, res) => {
  const user = await getUser(req.auth.payload.sub);

  // Fetch the collection to verify the custom fields
  const collection = await prisma.collection.findUnique({
    where: { id: parseInt(req.body.collectionId) },
  });

  if (!collection) {
    return res.status(404).json({ error: "Collection not found!" });
  }

  if (collection.userId !== user.id) {
    return res.status(403).json({
      error: "You are not authorized to add items to this collection.",
    });
  }

  // Handle tags if provided
  let tagConnections = [];
  if (req.body.tags && Array.isArray(req.body.tags)) {
    tagConnections = {
      connectOrCreate: req.body.tags.map((tag) => ({
        where: { name: tag },
        create: { name: tag },
      })),
    };
  }

  // Validate custom fields against collection's enabled custom fields
  const customFields = {};

  if (collection.customString1State && req.body.customString1) {
    customFields.customString1 = req.body.customString1;
  }
  if (collection.customString2State && req.body.customString2) {
    customFields.customString2 = req.body.customString2;
  }
  if (collection.customString3State && req.body.customString3) {
    customFields.customString3 = req.body.customString3;
  }
  if (collection.customInt1State && req.body.customInt1) {
    customFields.customInt1 = req.body.customInt1;
  }
  if (collection.customInt2State && req.body.customInt2) {
    customFields.customInt2 = req.body.customInt2;
  }
  if (collection.customInt3State && req.body.customInt3) {
    customFields.customInt3 = req.body.customInt3;
  }
  if (collection.customText1State && req.body.customText1) {
    customFields.customText1 = req.body.customText1;
  }
  if (collection.customText2State && req.body.customText2) {
    customFields.customText2 = req.body.customText2;
  }
  if (collection.customText3State && req.body.customText3) {
    customFields.customText3 = req.body.customText3;
  }
  if (collection.customBool1State && req.body.customBool1 !== undefined) {
    customFields.customBool1 = req.body.customBool1;
  }
  if (collection.customBool2State && req.body.customBool2 !== undefined) {
    customFields.customBool2 = req.body.customBool2;
  }
  if (collection.customBool3State && req.body.customBool3 !== undefined) {
    customFields.customBool3 = req.body.customBool3;
  }
  if (collection.customDate1State && req.body.customDate1) {
    customFields.customDate1 = req.body.customDate1;
  }
  if (collection.customDate2State && req.body.customDate2) {
    customFields.customDate2 = req.body.customDate2;
  }
  if (collection.customDate3State && req.body.customDate3) {
    customFields.customDate3 = req.body.customDate3;
  }

  // Create the item with the validated custom fields
  const item = await prisma.item.create({
    data: {
      ...req.body,
      collectionId: parseInt(req.body.collectionId),
      ...customFields,
      tags: tagConnections,
    },
  });

  res.json(item);
});

// Handle Get All Item
export const handleGetAllItem = asyncHandler(async (req, res) => {
  const items = await prisma.item.findMany({
    include: { collection: true, tags: true },
  });
  res.json(items);
});

// Handle Retrieves the latest 8 items
export const handleGetLatestItem = asyncHandler(async (req, res) => {
  const items = await prisma.item.findMany({
    take: 8,
    orderBy: { createdAt: "desc" },
    include: {
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
      tags: {
        select: {
          name: true,
        },
      },
      likes: true,
    },
  });
  res.json(items);
});

// Handle Get Single Item
export const handleGetSingleItem = asyncHandler(async (req, res) => {
  const item = await prisma.item.findUnique({
    where: { id: parseInt(req.params.id) },
    include: {
      collection: true,
      tags: true,
      comments: {
        select: {
          user: { select: { name: true, picture: true } },
          content: true,
          createdAt: true,
        },
      },
      likes: true,
    },
  });
  if (!item) return res.status(404).json({ error: "Item not found" });
  res.json(item);
});

// Handle Update Item
export const handleUpdateItem = asyncHandler(async (req, res) => {
  const user = await getUser(req.auth.payload.sub);
  const item = await prisma.item.findUnique({
    where: { id: parseInt(req.params.id) },
    include: { collection: true },
  });

  if (!item) {
    return res.status(404).json({ error: "Item not found!" });
  }

  if (item.collection.userId !== user.id) {
    return res.status(403).json({
      error: "You are not authorized to update this item.",
    });
  }
  const updatedItem = await prisma.item.update({
    where: { id: parseInt(req.params.id) },
    data: req.body,
  });

  res.status(200).json(updatedItem);
});

// Handle Delete Item
export const handleDeleteItem = asyncHandler(async (req, res) => {
  const user = await getUser(req.auth.payload.sub);
  const item = await prisma.item.findUnique({
    where: { id: parseInt(req.params.id) },
    include: { collection: true },
  });

  if (!item) {
    return res.status(404).json({ error: "Item not found!" });
  }

  if (item.collection.userId !== user.id) {
    return res.status(403).json({
      error: "You are not authorized to update this item.",
    });
  }
  await prisma.item.delete({
    where: { id: parseInt(req.params.id) },
  });
  res.json({ message: "Item deleted successfully" });
});

// Handle Comment in Item
export const handleCreateComment = asyncHandler(async (req, res) => {
  const user = await getUser(req.auth.payload.sub);

  const comment = await prisma.comment.create({
    data: { ...req.body, userId: user.id, itemId: parseInt(req.params.itemId) },
  });
  res.json(comment);
});

export const handleGetAllComments = asyncHandler(async (req, res) => {
  const comments = await prisma.comment.findMany({
    where: { itemId: parseInt(req.params.itemId) },
    include: { user: true },
  });
  res.json(comments);
});

// Need to change this function
export const handleDeleteComment = asyncHandler(async (req, res) => {
  const user = await getUser(req.auth.payload.sub);
  await prisma.comment.delete({
    where: { id: parseInt(req.params.commentId) },
  });
  res.json({ message: "Comment deleted successfully" });
});

// Handle Like in Item
export const handleCreateLike = asyncHandler(async (req, res) => {
  const user = await getUser(req.auth.payload.sub);
  const like = await prisma.like.create({
    data: { userId: user.id, itemId: parseInt(req.params.id) },
  });
  res.json("Like created successfully");
});

export const handleDeleteLike = asyncHandler(async (req, res) => {
  const user = await getUser(req.auth.payload.sub);
  await prisma.like.delete({
    where: {
      userId_itemId: {
        userId: user.id,
        itemId: parseInt(req.params.id),
      },
    },
  });
  res.json({ message: "Like removed successfully" });
});

// Handle Get my items
export const handleGetMyItems = asyncHandler(async (req, res) => {
  const user = await getUser(req.auth.payload.sub);

  const collections = await prisma.collection.findMany({
    where: {
      userId: user.id,
    },
    select: {
      items: {
        select: {
          id: true,
          name: true,
          tags: true,
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
          likes: {
            select: {
              userId: true, // If you need details about who liked it
            },
          },
          _count: {
            select: { likes: true }, // Get the count of likes
          },
        },
      },
    },
  });

  const items = collections.flatMap((collection) => collection.items);

  if (!items.length) {
    return res.status(404).json({ error: "No items found for this user." });
  }

  // Add the number of likes to each item
  const itemsWithLikeCount = items.map((item) => ({
    ...item,
    likeCount: item._count.likes,
  }));

  res.status(200).json(itemsWithLikeCount);
});
