import React, {useState} from 'react'
import Note from "./components/Note";

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState('a new note')
  const [showAll, setShowAll] = useState(true)

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1
    }
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const isImportant = note => note.important;
  const notesToShow = showAll ? notes : notes.filter(isImportant)



  const handleNoteChange = (event) => {
    const noteValue = event.target.value;
    console.log(noteValue)
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