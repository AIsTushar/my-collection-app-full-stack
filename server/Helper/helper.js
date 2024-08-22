import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const getUser = (auth0Id) => {
  return prisma.user.findUnique({ where: { auth0Id } });
};
