import express, { Request, Response, NextFunction } from "express";
import { prisma } from "../prisma/client";
import { AppError } from "../errors/AppError";

const accessValidator = (profiles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await prisma.users.findFirst({
        where: {
          email: res.locals.user,
        },
        include: {
          accessProfile: {
            select: {
              name: true,
            }
          }
        }
      })

      if (profiles.indexOf(user.accessProfile.name) === -1) {
        throw AppError('User not have permission')
      }
      
      return next();
    } catch (error) {
      return res.status(400).json(error);
    }
};

export { accessValidator }