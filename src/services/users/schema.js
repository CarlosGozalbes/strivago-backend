import mongoose from "mongoose"
import bcrypt from "bcrypt"

const { Schema, model } = mongoose

const UserSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["host", "guest"], default: "host" },
    facebookId:{type:String}
  },
  {
    timeStamps: true,
  }
)
UserSchema.pre("save", async function (next) {
  const newUser = this
  const plainpassword = newUser.password

  if (newUser.isModified("password")) {
    const hash = await bcrypt.hashSync(plainpassword, 11)
    newUser.password = hash
  }
  next()
})

UserSchema.methods.toJSON = function () {
  // this toJSON function will be called EVERY TIME express does a res.send(user/s)

  const userDocument = this
  const userObject = userDocument.toObject() // we have to convert to naormal  object beacuse userObject is Mongoose doucment(_doc)

  delete userObject.password
  delete userObject.__v

  return userObject
}

UserSchema.statics.checkCredentials = async function (email, plainPW) {
  const user = await this.findOne({ email })

  if (user) {
    const isPasswordMathed = await bcrypt.compare(plainPW, user.password)

    if (isPasswordMathed) {
      return user
    } else {
      return null
    }
  } else {
    return null
  }
}

export default model("User", UserSchema)

// Every User registers with email, password and a role, which could be either host or guest.
