import express, {Request, Response, NextFunction} from "express"
import listEndpoints from "express-list-endpoints"
import cors from "cors"
import mongoose from "mongoose"
import passport from "passport"
import { facebookStrategy } from "./auth/oauth"
import { badRequestHandler, unauthorizedHandler, notFoundHandler, genericErrorHandler, forbiddenHandler } from "./errorhandlers"
import accommodationsRouter from "./services/accommodations/index.js"
import userRouter from "./services/users/index.js"


const server = express()
const port = process.env.PORT || 3001

passport.use("facebook", facebookStrategy.Strategy);
//-----------------------------------MIDDLE WARES-----------------------------

server.use(cors())
server.use(express.json())
server.use(passport.initialize());

//-----------------------------------END POINTS-----------------------------
server.use("/accommodations", accommodationsRouter)
server.use("/users", userRouter)

//-----------------------------------ERROR MIDDLE WARES--------------------------

server.use(badRequestHandler)
server.use(unauthorizedHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)
server.use(forbiddenHandler)

//-----------------------------------CONNECTIONS--------------------------
mongoose.connect(process.env.MONGO_CONNECTION!)

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to Mongo!")
  server.listen(port, () => {
    console.table(listEndpoints(server))
    console.log("Server runnning on port: ", port)
  })
})


