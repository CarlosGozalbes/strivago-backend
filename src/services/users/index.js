import express from "express"
import createError from "http-errors"
import UserModel from "./schema.js"

const userRouter = express.Router()
//  -----------------------------------------------------ENDPOINT (ROUTE)--------------------------------
// --------------------1 post-----------------

userRouter.post("/register", async (req, res, next) => {
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
      console.log(error)
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})
// --------------------3 get with id-----------------
userRouter.get("/:userId", async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.userId)
    if (user) {
      res.send(user)
    } else {
      next(createError(404, `user with id ${user.req.params.userId}IS NOT FOUND IN THE DB !!`))
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})
// --------------------4 put with id-----------------
userRouter.put("/:userId", async (req, res, next) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.userId, req.body, { new: true })
    res.send(user)
  } catch (error) {
    console.log(error)
    next(error)
  }
})
// --------------------5 delete with id-----------------
userRouter.delete("/:userId", async (req, res, next) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.userId)
    res.send({ MESSAGE: "user delted from the DB!!", USER_id: user._id })
  } catch (error) {
    console.log(error)
    next(error)
  }
})

export default userRouter
