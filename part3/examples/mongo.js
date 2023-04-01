const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>',
  )
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://carlos99:${password}@cluster0.lni3jxx.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url)

// El esquema le dice a Mongoose cómo se almacenarán los objetos de nota en la base de datos.
const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

// modelo, como convencion mongoose nombra automaticamente las coleccionesa de la BD con el plural de este modelo
// Los modelos son las llamadas funciones constructoras que crean nuevos objetos JavaScript
const Note = mongoose.model('Note', noteSchema)

// la aplicación crea un nuevo objeto de nota con la ayuda del modelo de Note
// Dado que los objetos se crean con la función constructora del modelo,
// tienen todas las propiedades del modelo, que incluyen métodos para guardar el objeto en la base de datos.
const note = new Note({
  content: 'Callback-functions suck',
  date: new Date(),
  important: true,
})

// Guardar el objeto en la base de datos ocurre con el método save, que se puede proporcionar con un controlador
// de eventos con el método then:
/* note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
}) */
// Cuando el objeto se guarda en la base de datos, el controlador de eventos proporcionado then se invoca.
// El controlador de eventos cierra la conexión de la base de datos con el comando mongoose.connection.close().
// Si la conexión no se cierra, el programa nunca terminará su ejecución.
// El resultado de la operación de guardar está en el parámetro result del controlador de eventos

// Los objetos se recuperan de la base de datos con el método find del modelo Note
Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note)
  })
  mongoose.connection.close()
})
// El parámetro del método es un objeto que expresa condiciones de búsqueda. Dado que el parámetro es un objeto vacío {},
// obtenemos todas las notas almacenadas en la colección notes.
// Podríamos restringir nuestra búsqueda para incluir solo notas importantes como esta:
// Note.find({ important: true }).then(result => {
// ...
// })
// La idea detrás de Mongoose es que los datos almacenados en la base de datos reciben un esquema al nivel de la
// aplicación que define la forma de los documentos almacenados en una colección determinada.
