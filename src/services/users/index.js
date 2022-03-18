import express from "express"
import createError from "http-errors"
import UserModel from "./schema.js"

const userRouter = express.Router()
//  -----------------------------------------------------ENDPOINT (ROUTE)--------------------------------
// --------------------1 post-----------------
userRouter.post("/", async (req, res, next) => {
  try {
    const newUser = new UserModel(req.body)
    const { _id } = await newUser.save()
    res.status(201).send({ _id })
  } catch (error) {
    console.log(error)
    next(error)
  }
})
// --------------------2 get all-----------------
userRouter.get("/", async (req, res, next) => {
  try {
    const user = await UserModel.find()
    if (user) {
      res.send(user)
    } else {
      //   next(createError(404, "users not found"))
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})
// --------------------3 get with id-----------------
userRouter.get("/userId", async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error)
    next()
  }
})
// --------------------4 put with id-----------------
userRouter.put("/:userId", async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error)
    next()
  }
})
// --------------------5 delete with id-----------------
userRouter.delete("/userId", async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error)
    next()
  }
})

export default userRouter
