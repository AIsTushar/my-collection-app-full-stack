import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

// Handle User Signup
export const handleSignup = asyncHandler(async (req, res) => {
  const { auth0Id, name, email, picture } = req.body;
  let user = await prisma.user.findUnique({
    where: {
      auth0Id,
    },
  });
  if (!user) {
    user = await prisma.user.create({
      data: {
        auth0Id,
        name,
        email,
        picture,
      },
    });
  }
  res.status(201).json({ message: "User created successfully", user });
});

// Handle User Login
export const getUserData = asyncHandler(async (req, res) => {
  const { sub: auth0Id } = req.auth.payload;
  const user = await prisma.user.findUnique({
    where: {
      auth0Id,
    },
  });
  if (!user) {
    res.status(404).json({ error: "User not found!" });
  }
  res.status(200).json(user);
});
