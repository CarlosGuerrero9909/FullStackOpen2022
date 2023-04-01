const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

// Podemos definir reglas de validación específicas para cada campo en el esquema: esta es una facilidad que provee Mongoose
// La funcionalidad del validador personalizado de Mongoose nos permite crear nuevos validadores ver documentacion
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: 5,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  important: Boolean,
})

// Una forma de formatear los objetos devueltos por Mongoose es modificar el método toJSON del esquema,
// que se utiliza en todas las instancias de los modelos producidos con ese esquema.
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

// La interfaz pública del módulo se define estableciendo un valor en la variable module.exports.
// Estableceremos el valor para que sea el modelo Note.
module.exports = mongoose.model('Note', noteSchema)
