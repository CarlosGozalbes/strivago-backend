import express from "express"
import listEndpoints from "express-list-endpoints"
import cors from "cors"
import mongoose from "mongoose"
import { badRequestHandler, unauthorizedHandler, notFoundHandler, genericErrorHandler, forbiddenHandler } from "./errorHandlers.js"
import userRouter from "./services/users/index.js"
// import blogPostsRouter from "./services/blogPosts/index.js";

// import passport from "passport";
// import googleStrategy from "./auth/oauth.js";

const server = express()
const port = process.env.PORT || 3001

// passport.use("google", googleStrategy);
//-----------------------------------MIDDLE WARES-----------------------------

server.use(cors())
server.use(express.json())
// server.use(passport.initialize());

//-----------------------------------END POINTS-----------------------------
server.use("/users", userRouter)
// server.use("/accomodations", accomodationsRouter);

//-----------------------------------ERROR MIDDLE WARES--------------------------

server.use(badRequestHandler)
server.use(unauthorizedHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)
server.use(forbiddenHandler)

//-----------------------------------CONNECTIONS--------------------------
mongoose.connect(process.env.MONGO_CONNECTION)

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to Mongo!")
  server.listen(port, () => {
    console.table(listEndpoints(server))
    console.log("Server runnning on port: ", port)
  })
})

server.on("error", (error) => {
  console.log(`Server is stopped : ${error}`)
})
