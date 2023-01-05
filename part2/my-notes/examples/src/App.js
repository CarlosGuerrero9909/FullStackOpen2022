import React, {useState, useEffect} from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import { Notification } from './components/Notification'
import { Footer } from './components/Footer'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('Some error hapened...')

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const addNote = (event) => {
    event.preventDefault()
    
    const noteObject = {
      content: newNote,
      date: new Date().toString(),
      important: Math.random() < 0.5,
      /*id: notes.length +1,*/ //es mejor dejar que el servidor genere id para nuestros recursos
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))       
        setNewNote('')
      })

  }

  //sincroniza los cambios realizados en la entrada con el estado del componente
  const handleNote = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))      
      })
      .catch(error => {
        setErrorMessage (
          `Note '${note.content}' was alredy removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'Important' : 'All'}
        </button>
      </div>
      <ul>
        {notesToShow.map(
          note => (
            <Note 
              key={note.id} 
              _note={note} 
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          )
        )}      
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNote} />
        <button type="submit">Save</button>
      </form>
      <Footer/>
    </div>
  )
}

export default App
