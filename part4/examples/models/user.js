// Define el modelo para representar a un usuario
const mongoose = require('mongoose')
// validador para verificar la unicidad de un campo
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  name: String,
  // ¡Nunca es aconsejable almacenar contraseñas de texto plano sin cifrar en la base de datos!
  passwordHash: String, // El hash de la contraseña es el resultado de una función hash unidireccional aplicada a la contraseña del usuario
  // Los identificadores de las notas se almacenan dentro del documento del usuario como una matriz de ID de Mongo
  // El tipo de campo es ObjectId que hace referencia a documentos de estilo-nota. Mongo no sabe de manera inherente
  // que este es un campo que hace referencia a notas, la sintaxis está puramente relacionada y definida por Mongoose.
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note'
    }
  ]
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const user = mongoose.model('User', userSchema)
module.exports = user
