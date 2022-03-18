import createHttpError from "http-errors";
import {verifyJWT} from './GenAndVerifyToken.js'

export const authMiddlaware =async(req,res,next)=> {
    try {
        if(!req.headers.authorization){
            next(createHttpError(401, "Please provide bearer token in authorization header!"))
        }else{
            const token = req.headers.authorization.replace('Bearer ', '')
            const payload = await verifyJWT(token)


            req.user = {
                _id: payload._id,
                role: payload.role
            }
            next()
        }
    } catch (error) {
        next(createHttpError(401, "User is unauthorized!"))        
    }
}