import React from 'react'

const Note = ({note, toggleImportance}) => {
  const label = note.important ? 'Make note important'
    : 'Make important'
  return (
    <li className='note'>{note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note