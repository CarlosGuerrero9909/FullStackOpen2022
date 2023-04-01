// Los controladores de ruta también se han movido a un módulo dedicado.
// Todas las rutas relacionadas con las notas están ahora en el módulo notes.js bajo el directorio controllers.

// El enrutador es de hecho un middleware, que se puede utilizar para definir "rutas relacionadas" en un solo lugar,
// que normalmente se coloca en su propio módulo. Todas las rutas están ahora definidas para el objeto enrutador
// Cada aplicación Express tiene un enrutador de aplicación incorporado
const notesRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Note = require('../models/note')
const User = require('../models/user')

// La sintaxis async/await que se introdujo en ES7 hace posible el uso de funciones asincrónicas que devuelven una
// promesa de una manera que hace que el código parezca sincrónico.
// espera hasta que se cumpla la promesa relacionada, y luego continúa su ejecución a la siguiente línea.
// La palabra clave await no se puede usar en cualquier parte del código JavaScript. El uso de await solo es posible dentro de una función async.
notesRouter.get('/', async (request, response) => {
  // Es importante entender que la base de datos en realidad no sabe que los ID almacenados en el campo user de notas hacen referencia a documentos en el colección de usuario.
  // La funcionalidad del método populate de Mongoose se basa en el hecho de que hemos definido "tipos" para las referencias en el esquema de Mongoose con la opción ref:
  const notes = await Note
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(notes)

  /* Note.find({}).then((notes) => { //si no se utilizara async/await habria que  acceder al resultado de la operación registrando una función de devolución de llamada con el método then.
    response.json(notes)
  }) */
})

notesRouter.get('/:id', async (request, response, next) => {
  const note = await Note.findById(request.params.id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
  /* Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error)) */
})

// La función auxiliar getTokenFrom aísla el token del encabezado de authorization
const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

notesRouter.post('/', async (request, response, next) => {
  const { body } = request

  const token = getTokenFrom(request)
  // la validez del token se comprueba con jwt.verify El método también decodifica el token, o devuelve el objeto en el que se basó el token:
  const decodedToken = jwt.verify(token, process.env.SECRET)
  // El objeto decodificado del token contiene los campos username y id, que le dice al servidor quién hizo la solicitud.
  // Si no hay ningún token, o el objeto decodificado del token no contiene la identidad del usuario el código de estado de error 401 unauthorized es devuelto
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  // Cuando se resuelve la identidad del autor de la solicitud, la ejecución continúa como antes.
  const user = await User.findById(decodedToken.id)

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
    user: user._id,
  })

  // La 'magia' de la biblioteca express-async-errors definida en app.js nos permite eliminar por completo los bloques try-catch y la llamada la llamada next(exception)
  // Si ocurre una excepción en una ruta async, la ejecución se pasa automáticamente al middleware de manejo de errores
  const savedNote = await note.save()

  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  response.json(savedNote)

  // Con async/await, la forma recomendada de lidiar con las excepciones es el viejo y familiar mecanismo try/catch:
  /* try{
    const savedNote = await note.save()
    response.json(savedNote)
  } catch(exception) {
    next(exception)
  } */
  /* note.save() //si no se usara async/await
    .then((savedNote) => {
      response.json(savedNote)
    })
    .catch((error) => next(error)) */
})

notesRouter.delete('/:id', async (request, response, next) => {
  await Note.findByIdAndRemove(request.params.id)
  response.status(204).end()

  /* Note.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error)) */
})

notesRouter.put('/:id', (request, response, next) => {
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

module.exports = notesRouter
