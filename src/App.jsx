import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);

  const [notes, setNotes] = useState([]);

  console.log(notes);

  const getNotes = async () => {
    const response = await fetch("http://localhost:3000/notes");
    const data = await response.json();
    //console.log(data);
    setNotes(data);
  };

  useEffect(() => {
    getNotes();
  }, []);

  const handleAddNote = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    // const newNote = {
    //   id: notes.length + 1,
    //   title: title,
    //   content: content,
    // };
    const newNote = response.json();
    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
    //setNotes([...notes, newNote]);
  };
  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleUpdateNote = async (e) => {
    e.preventDefault();
    if (!selectedNote) {
      return;
    }
    const noteId = selectedNote._id;

    try {
      const response = await fetch(
        `http://localhost:3000/notes/api/${noteId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content }),
        }
      );
      const updateNote = await response.json();

      const updateNodeLists = notes.map((note) =>
        note._id === selectedNote._id ? updateNote : note
      );

      setNotes(updateNodeLists);
      setTitle("");
      setContent("");
      setSelectedNote(null);
    } catch (error) {
      throw new Error("Failed to update the note");
    }
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const deleteNote = async (e, NoteId) => {
    e.stopPropagation();
    console.log(e);
    console.log(NoteId);
    try {
      await fetch(`http://localhost:3000/Notes/${NoteId}`, {
        method: "DELETE",
      });
      setNotes(notes.filter((note) => note.id !== NoteId));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="app-container">
        <form
          className="note-form"
          onSubmit={(e) =>
            selectedNote ? handleUpdateNote(e) : handleAddNote(e)
          }
        >
          <input
            placeholder="Title"
            required
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <textarea
            placeholder="Content"
            rows={10}
            required
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          {selectedNote ? (
            <div className="edit-buttons">
              <button type="submit">Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          ) : (
            <button type="submit">Add Note</button>
          )}
        </form>
        {notes.length === 0 && ""}

        {notes.length !== 0 && (
          <div className="notes-grid">
            {notes.map((note) => (
              <div
                className="note-item"
                key={note._id}
                onClick={() => {
                  handleNoteClick(note);
                }}
              >
                <div className="notes-header">
                  <button
                    onClick={(e) => {
                      deleteNote(e, note._id);
                    }}
                  >
                    {" "}
                    x
                  </button>
                </div>
                <h2>{note.title}</h2>
                <p>{note.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;

// document.addEventListener("DOMContentLoaded", function () {
//   const btn = document.getElementById("check-btn");
//   btn.addEventListener("click", function () {
//     alert("Please input a value");
//   });
// });
