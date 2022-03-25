import createHttpError from "http-errors";
import { Request, Response, NextFunction } from "express";
declare module "express" {
  interface Request {
    user: any;
  }
}
export const userHostOnliMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

export const guestOnlyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
