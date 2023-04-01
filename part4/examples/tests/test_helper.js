// Los mismos pasos de verificación se repetirán en otras pruebas más adelante, y es una buena idea extraer estos pasos en funciones auxiliares.
const Note = require('../models/note');
const User = require('../models/user');

// La matriz initialNotes que contiene el estado inicial de la base de datos
const initialNotes = [
  {
    content: 'HTML is easy',
    date: new Date(),
    important: false,
  },
  {
    content: 'Browser can execute only Javascript',
    date: new Date(),
    important: true,
  },
];

// se puede usar para crear un ID de objeto de base de datos que no pertenezca a ningún objeto de nota en la base de datos.
const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon', date: new Date() });
  await note.save();
  await note.remove();

  return note._id.toString();
};

// verificar las notas almacenadas en la base de datos
const notesInDb = async () => {
  const notes = await Note.find({});
  return notes.map((note) => note.toJSON());
};

// La función se utiliza para ayudarnos a verificar el estado de la base de datos después de que se crea un usuario
const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialNotes, nonExistingId, notesInDb, usersInDb,
};
