// La responsabilidad de establecer la conexión con la base de datos se ha entregado al módulo app.js.
// El archivo note.js del directorio models solo define el esquema de Mongoose para las notas.
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 5,
  },
  date: Date,
  important: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const note = mongoose.model('Note', noteSchema);
module.exports = note;
