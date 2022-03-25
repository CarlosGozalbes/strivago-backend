import { NextFunction } from "express";
import createHttpError from "http-errors";

export const userHostOnliMiddleware = async (req:Request, res:Response, next:NextFunction) => {
  try {
    console.log({ ruser: req.user });
    if (req.user.role === "host") {
      next();
    } else {
      next(createHttpError(403, "Only Host is allowed!"));
    }
  } catch (error) {
    next(createHttpError(403, "Only Host is allowed!"));
  }
};

export const guestOnlyMiddleware = async (req:Request, res:Response, next:NextFunction) => {
  try {
    if (req.user.role === "guest") {
      next();
    } else {
      next(createHttpError(403, "Only Guest is allowed!"));
    }
  } catch (error) {
    next(createHttpError(403, "Only Guest is allowed!"));
  }
};
