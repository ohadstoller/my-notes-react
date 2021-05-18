import React, {useEffect, useState} from 'react'
import Note from "./components/Note";
import {createNoteRequest, getAllNotesRequest, updateNoteRequest} from "./services/noteService";


const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note')
  const [showAll, setShowAll] = useState(true);


  const fetchNotes = async () => {
    const response = await getAllNotesRequest();
    setNotes(response.data)
  };

  useEffect(
    fetchNotes, []
  )

  const createNoteObject = () => {
    return (
      {
        content: newNote,
        date: new Date(),
        important: Math.random() < 0.5,
      }

    )
  }


  const addNote = async (event) => {
    event.preventDefault()
    const noteObject = createNoteObject()
    const {data} = await createNoteRequest(noteObject);
    await setNotes(notes.concat(data))
    await setNewNote('')
  }


  const isImportant = note => note.important;
  const notesToShow = showAll ? notes : notes.filter(isImportant)

  const toggleImportanceOf = async (id) => {
    const note = notes.find(note => note.id === id)
    const changedNote = {...note, important: !note.important}
    const req = await updateNoteRequest(id, changedNote)
    await setNotes(notes.map(note => note.id !== id ? note : req.data))
  }


  const handleNoteChange = (event) => {
    const noteValue = event.target.value;
    setNewNote(noteValue)
  }

  return (
    <div>
      <form onSubmit={addNote}>
        <input onChange={handleNoteChange}
               value={newNote}
               placeholder="Add your note here"/>
        <button type="submit">save</button>
      </form>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note}
                toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
    </div>
  )
}

export default App