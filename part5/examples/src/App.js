import { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'
import noteService from './services/notes'
import loginService from './services/login'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  /*Effect Hook le permite realizar efectos secundarios en componentes de funciones. Obtener datos, configurar una suscripción y cambiar manualmente el DOM en los componentes de React son todos ejemplos de efectos secundarios.
  El array vacío como parámetro del effect hook asegura que el hook se ejecute solo cuando el componente es renderizado por primera vez.*/
  useEffect(() => {    
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')    
    if (loggedUserJSON) {      
      const user = JSON.parse(loggedUserJSON) //cuando se lee un objeto JSON del almacenamiento local, debe parsearse de nuevo a JavaScript con JSON.parse.     
      setUser(user)      
      noteService.setToken(user.token)    
    }  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      /*Si la conexión es exitosa, los campos de formulario se vacían y la respuesta del servidor (incluyendo un token y los datos de usuario) se guardan en el campo user de estado de la aplicación.*/
      const user = await loginService.login({
        username, password,
      })
      /*Local Storage es una base de datos de clave-valor en el navegador.  Un valor correspondiente a una determinada clave se guarda en la base de datos con el método setItem guarda el string dado como segundo parámetro como el valor de la clave name. 
      El valor de una clave se puede encontrar con el método getItem y removeItem elimina una clave. Los valores del almacenamiento local se conservan incluso cuando se vuelve a renderizar la página. El almacenamiento es específico de origen, por lo que cada aplicación web tiene su propio almacenamiento.*/
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user) //El objeto debe analizarse primero en JSON, con el método JSON.stringify    
      ) 
      /*El controlador de eventos responsable del inicio de sesión (handleLogin) debe cambiarse para llamar al método noteService.setToken(user.token) con un inicio de sesión exitoso: */
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }

    noteService
      .create(noteObject)
        .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

   const toggleImportanceOf = id => {
      const note = notes.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important }
  
      noteService
        .update(id, changedNote).then(returnedNote => {
          setNotes(notes.map(note => note.id !== id ? note : returnedNote))
        })
        .catch(error => {
          setErrorMessage(
            `Note '${note.content}' was already removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setNotes(notes.filter(n => n.id !== id))
        })
    }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          /*Los controladores de eventos son simples: se les da un objeto como parámetro, y desestructuran el campo target del objeto y guardan su valor en el estado. */
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )
  
  const noteForm = () => (
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={handleNoteChange}
      />
      <button type="submit">save</button>
    </form>  
  )

  return (
    <div>
      <h1>Notes app</h1>
      <Notification message={errorMessage} />

      {/*renderizarlos condicionalmente: muestra el formulario de inicio de sesión solo si el usuario no ha iniciado sesión, cuando user === null
      Un truco de React ligeramente extraño, pero de uso común, se usa para renderizar los formularios de forma condicional:
      Si la primera declaración se evalúa como falsa, o es falsy, la segunda declaración (que genera el formulario) no se ejecuta en absoluto.*/}
      {!user && loginForm() /*user === null && loginForm()*/}
      {user && <div>
        <p>{user.name} logged in</p>
          {noteForm()}
        </div>
      } 
 
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div> 
      <ul>
        <ul>
          {notesToShow.map(note => 
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          )}
        </ul>
      </ul>

      <Footer />
    </div>
  )
}

export default App
