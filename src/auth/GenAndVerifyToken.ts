import express from "express";
import jwt from "jsonwebtoken";


interface User {
   _id:string;
    role:string;
  }
export const JWTauthenticate = async (user) => {
  try {
    const accessToken = await generateJWTToken({
      _id: user._id,
      role: user.role,
    });
    return accessToken;
  } catch (error) {
    console.log(error);
  }
};

process.env.TS_NODE_DEV && require("dotenv").config()
if (!process.env.JWT_SECRET_KEY) {
  throw new Error("No jwt defined.")
}
const generateJWTToken = (payload:String) =>
  new Promise((resolve, reject) =>
    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) reject(err);
        else resolve(token);
      }
    )
  );

export const verifyJWT = (token:string) =>
  new Promise((resolve, reject) =>
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
      if (err) reject(err);
      else resolve(payload);
    })
  );
