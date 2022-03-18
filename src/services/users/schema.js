import mongoose from "mongoose"

const { Schema, model } = mongoose

const UserSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["host", "guest"], required: true },
    facebookId:{type:String}
  },
  {
    timeStamps: true,
  }
)
export default model("User", UserSchema)

// Every User registers with email, password and a role, which could be either host or guest.
