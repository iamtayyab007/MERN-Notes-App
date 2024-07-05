import { useState } from "react";

import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "test note 1",
      content: "bla bla note1",
    },
    {
      id: 2,
      title: "test note 2 ",
      content: "bla bla note2",
    },
    {
      id: 3,
      title: "test note 3",
      content: "bla bla note3",
    },
    {
      id: 4,
      title: "test note 4 ",
      content: "bla bla note4",
    },
    {
      id: 5,
      title: "test note 5",
      content: "bla bla note5",
    },
    {
      id: 6,
      title: "test note 6",
      content: "bla bla note6",
    },
  ]);

  const handleAddNote = (e) => {
    e.preventDefault();
    console.log(e);
    const newNote = {
      id: notes.length + 1,
      title: title,
      content: content,
    };
    setTitle("");
    setContent("");
    setNotes([...notes, newNote]);
  };
  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleUpdateNote = (e) => {
    e.preventDefault();
    if (!selectedNote) {
      return;
    }

    const updateNodeLists = notes.map((note) =>
      note.id === selectedNote.id
        ? { ...notes, title: title, content: content }
        : note
    );
    setNotes(updateNodeLists);
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const deleteNote = (e, NoteId) => {
    e.stopPropagation();
    console.log(e);
    setNotes(notes.filter((note) => note.id !== NoteId));
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
        <div className="notes-grid">
          {notes.map((note) => (
            <div
              className="note-item"
              key={note.id}
              onClick={() => {
                handleNoteClick(note);
              }}
            >
              <div className="notes-header">
                <button
                  onClick={(e) => {
                    deleteNote(e, note.id);
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
      </div>
    </>
  );
}

export default App;
