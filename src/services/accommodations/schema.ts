import mongoose from "mongoose";

const { Schema, model } = mongoose;
interface Host {
  name: string
  user: {
      _id: string,
      timestamp: number
  }[]
}

const commentSchemma = new Schema({
  text: { type: String, minLength: 10, required: true },
  rate: { type: Number, min: 0, max: 5, required: true },

  user: {
    name: { type: String, required: false },
    avatar: { type: String, required: false },
  },
});

const accommodationSchema = new Schema(
  {
    name: { type: String, required: true, },
    city: { type: String, required: true },
    maxGuest: { type: Number, required: true},
    image: { type: String, required: false },
    host: [{ type: Schema.Types.ObjectId, ref: "User" }],
    description: { type: String, minLength: 20, required: true },
    comments: [commentSchemma],
  },
  {
    timestamps: true, // adds and manages automatically createdAt and updatedAt fields
  }
);

export default model("Accommodation", accommodationSchema);
