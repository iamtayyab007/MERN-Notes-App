import express from "express";
const app = express();
import { MongoClient } from "mongodb";
import { Note } from "./models/notes.model.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
const port = 3000;
import cors from "cors";
import Params from "params";

app.use(cors());

app.use(bodyParser.json());

dotenv.config();

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      "mongodb://localhost:27017/notes"
    );
    console.log(
      `\n MongoDB connected !! DB HOST ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection error", error);
    process.exit(1);
  }
};
connectDB()
  .then(() => {
    app.on("error", () => {
      console.log("Error:", error);
    });
    app.listen(port, () => {
      console.log(`server is listening at ${port}`);
    });
  })
  .catch((error) => {
    console.log("There is an error connecting to mongodb:", error);
  });

app.post("/posts", async (req, res) => {
  try {
    const notes = req.body;
    const db = Note;
    const newNote = new Note({
      title: notes.title,
      content: notes.content,
    });
    const result = await newNote.save();
    res.send({ success: true, result });
  } catch (error) {
    res.status(500).json({ message: "Error is catching note", error });
  }
});

app.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ success: false, message: "server error", error });
  }
});

app.delete("/Notes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedNote = await Note.findByIdAndDelete(id); // Delete the note
    if (!deletedNote) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" }); // Note not found
    }
    res
      .status(200)
      .json({ success: true, message: "Note deleted successfully" }); // Note deleted
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error }); // Server error
  }

  app.put("/notes/api/:id", async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.params;

    try {
      const updatedNote = await Note.findByIdAndUpdate(
        id,
        { title, content },
        { new: true }
      ); // Update the note

      if (!updatedNote) {
        return res
          .status(404)
          .json({ success: false, message: "Note not found" }); // Note not found
      }

      res.json(updatedNote);
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error", error }); // Server error
    }
  });
});

// app.listen(port, () => {
//   console.log(`Example app listening on http://localhost:${port}`);
// });
