import createHttpError from "http-errors";

export const userHostOnliMiddleware =async(req,res,next)=> {
    try {
        if(req.user.role === "Host"){   
            next()
        }
    } catch (error) {
        next(createHttpError(403, "Only Host is allowed!"))
    }
}

export const guestOnlyMiddleware =async(req,res,next)=> {
    try {
        if(req.user.role === "Guest"){   
            next()
        }
    } catch (error) {
        next(createHttpError(403, "Only Guest is allowed!"))
    }
}