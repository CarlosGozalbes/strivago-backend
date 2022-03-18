import createHttpError from "http-errors";

export const userHostOnliMiddleware =async(req,res,next)=> {
    try {
        if (req.user.role === "host") {
          next();
        } else {
          next(createHttpError(403, "Only Host is allowed!"));
        }
    } catch (error) {
        next(createHttpError(403, "Only Host is allowed!"))
    }
}

export const guestOnlyMiddleware =async(req,res,next)=> {
    try {
        if (req.user.role === "guest") {
          next();
        } else {
          next(createHttpError(403, "Only Guest is allowed!"));
        }
    } catch (error) {
        next(createHttpError(403, "Only Guest is allowed!"))
    }
}