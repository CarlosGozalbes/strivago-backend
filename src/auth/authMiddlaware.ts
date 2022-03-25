import { RequestHandler } from "express";
import createHttpError from "http-errors";
import {verifyJWT} from './GenAndVerifyToken.js'

export const authMiddlaware:RequestHandler =async(req, res, next)=> {
    try {
        
        if(!req.headers.authorization){
            next(createHttpError(401, "Please provide bearer token in authorization header!"))
        }else{
            const token:string = req.headers.authorization.replace('Bearer ', '')
            if (!token) return res.status(401).send({ error: "No token provided" });
            const payload = await verifyJWT(token)
            console.log("Payload",payload);
            

            
            req.user = {
                _id: payload._id,
                role: payload.role
            }
            next();
        }
    } catch (error) {
        next(createHttpError(401, "User is unauthorized!"))        
    }
}