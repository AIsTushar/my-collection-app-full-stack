import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";
import { getUser } from "../Helper/helper.js";

// Get profile Data
export const handleGetUserProfile = asyncHandler(async (req, res) => {
  const user = await getUser(req.auth.payload.sub);
  const response = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      collections: {
        include: {
          items: {
            include: {
              tags: true,
            },
          },
        },
      },
    },
  });

  res.send(response);
});

// Update User
export const handleUpdateUser = asyncHandler(async (req, res) => {
  const user = await getUser(req.auth.payload.sub);
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: req.body,
  });
  res.send(updatedUser);
});
