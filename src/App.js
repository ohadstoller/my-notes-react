import React, {useEffect, useState} from 'react'
import Note from "./components/Note";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('a new note')
  const [showAll, setShowAll] = useState(true);


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchNotes = async () => {
    const response = await axios.get('http://localhost:3001/notes')
    setNotes(response.data)
  };

  useEffect(
    fetchNotes, []
  )


  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() < 0.5,
    }
    axios.post('http://localhost:3001/notes', noteObject).then(response => {
    })
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const isImportant = note => note.important;
  const notesToShow = showAll ? notes : notes.filter(isImportant)


  const handleNoteChange = (event) => {
    const noteValue = event.target.value;
    console.log('adding new note: ', noteValue)
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
          <Note key={note.id} note={note}/>
        )}
      </ul>
    </div>
  )
}

export default App