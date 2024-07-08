import mongoose, { Schema } from "mongoose";
const noteSchema = new Schema(
  {
    title: "String",
    content: "String",
  },
  { timestamps: true }
);

export const Note = mongoose.model("Note", noteSchema);
