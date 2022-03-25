import createHttpError from "http-errors";

import { RequestHandler } from "express";



export const userHostOnliMiddleware: RequestHandler = async (req,res,next) => {
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

export const guestOnlyMiddleware: RequestHandler = async (req, res, next) => {
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
