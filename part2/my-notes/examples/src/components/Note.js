import React from 'react'

const Note = ({ _note, toggleImportance }) =>{
  const label = _note.important ? 'make not important' : 'make important'

  return(
    <li className='note'>
      {_note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>

  )

} 

export default Note
