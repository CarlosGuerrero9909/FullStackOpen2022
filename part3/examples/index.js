const express = require('express')

const app = express()
const cors = require('cors') // cors -> permite el intercambio de recursos de origen cruzado. cuando servidor y app tienen un origen diferente
require('dotenv').config()
const Note = require('./models/note')

// midleware antes de rutas (registrador de peticiones)
const requestLogger = (request, response, next) => {
  console.log('Method', request.method)
  console.log('Path', request.path)
  console.log('Body', request.body)
  console.log('---')
  next()
}

app.use(express.json())
app.use(requestLogger)
app.use(cors())
// siempre que express recibe una solicitud HTTP GET, primero verificará si el directorio build contiene
// un archivo correspondiente a la dirección de la solicitud. Si se encuentra un archivo correcto, express lo devolverá.
app.use(express.static('build')) // busca y devuelve los archivos estáticos solicitados por el usuario y recibe como parámetro la ruta del folder donde están esos archivos.

/* ------------------- Rutas (peticiones)  Endpoints --------------------*/

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.post('/api/notes', (request, response, next) => {
  const { body } = request

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note
    .save()
    .then((savedNote) => savedNote.toJSON())
    .then((savedAndFormattedNote) => {
      // el método then de una promesa también devuelve una promesa y podemos acceder a la nota formateada registrando una nueva función callback con el método then
      response.json(savedAndFormattedNote)
    })
    .catch((error) => next(error))
})

// Ahora, la variable notes se asigna a un array de objetos devueltos por Mongo.
// Cuando la respuesta se envía en formato JSON, el método JSON.stringify llama automáticamente al método toJSON de cada objeto del array.
app.get('/api/notes', (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes)
  })
})

// Delete Para suprimir un recurso de estructura de objeto, se requiere el ID del objeto principal.
app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

// Cuando se trata de Promesas (then), casi siempre es una buena idea agregar el manejo de errores y excepciones (catch),
// porque de lo contrario se encontrará lidiando con errores extraños.
// Cada vez que trabajas en un proyecto con un backend, es fundamental estar atento a la salida de la consola del backend.
// Nunca es una mala idea imprimir el objeto que causó la excepción en la consola en el controlador de errores:
app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error)) // Cambiemos el manejador de la ruta para que pase el error hacia adelante con la función next.
  // El error que se pasa hacia adelante se da a la función next como parámetro Si se llamó a next sin un parámetro,
  // entonces la ejecución simplemente pasaría a la siguiente ruta o middleware.
  // Si se llama a la función next con un parámetro, la ejecución continuará en el middleware del controlador de errores.
})

// Utilice el método PUT para actualizar o insertar un recurso.
// Hay un detalle importante con respecto al uso del método findByIdAndUpdate. De forma predeterminada, el parámetro updatedNote
// del controlador de eventos recibe el documento original sin las modificaciones. Agregamos el parámetro opcional { new: true },
// que hará que nuestro controlador de eventos sea llamado con el nuevo documento modificado en lugar del original.
app.put('/api/notes/:id', (request, response, next) => {
  const { body } = request

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote)
    })
    .catch((error) => next(error))
})

/* ------------------------------ El orden de carga del middleware-----------------------------------------------------*/

// midleware despues de rutas (endpoint desconocido) peticiones a rutas inexistentes
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
// handler of requests with unknown endpoint
app.use(unknownEndpoint)

// Los manejadores de errores de Express son middleware que se definen con una función que acepta cuatro parámetros.
// Nuestro controlador de errores se ve así:
const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error) // middleware pasa el error al controlador de errores Express predeterminado.
}
// handler of requests with result to errors
app.use(errorHandler)

const { PORT } = process.env
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
