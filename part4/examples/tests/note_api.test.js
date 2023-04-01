const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const supertest = require('supertest');
const User = require('../models/user');
const helper = require('./test_helper');
const app = require('../app');
// La prueba importa la aplicación Express del módulo app.js y la envuelve con la función supertest en un objeto llamado superagent.
// Este objeto se asigna a la variable api y las pruebas pueden usarlo para realizar solicitudes HTTP al backend.
const api = supertest(app);

// Para hacer nuestras pruebas más robustas, tenemos que restablecer la base de datos y generar los datos de prueba necesarios
// de manera controlada antes de ejecutar las pruebas.
const Note = require('../models/note');

// Inicialicemos la base de datos antes de cada prueba con la función beforeEach:
// La base de datos se borra al principio, y luego guardamos las dos notas almacenadas en la matriz initialNotes en la base de datos.
// Al hacer esto, nos aseguramos de que la base de datos esté en el mismo estado antes de ejecutar cada prueba.
beforeEach(async () => {
  await Note.deleteMany({});
  await Note.insertMany(helper.initialNotes);
  /* await Note.deleteMany({})

  //La variable noteObjects se asigna a una matriz de objetos Mongoose que se crean con el constructor Note para cada una de las notas en la matriz helper.initialNotes
  const noteObjects = helper.initialNotes
    .map(note => new Note(note))

  // La siguiente línea de código crea una nueva matriz que consiste en promesas, que se crean llamando al método save de cada elemento en la matriz noteObjects.
  const promiseArray = noteObjects.map(note => note.save())

  //El método Promise.all se puede utilizar para transformar una serie de promesas en una única promesa, que se cumplirá una vez que se resuelva cada promesa en la matriz que se le pasa como parámetro
  //La última línea de código await Promise.all(promiseArray) espera que finalice cada promesa de guardar una nota, lo que significa que la base de datos se ha inicializado.
  await Promise.all(promiseArray) */
});

describe('when there is initially some notes saved', () => {
  // Nuestra prueba realiza una solicitud HTTP GET a la URL api/notes y verifica que se responda a la solicitud con el código de estado 200.
  // La prueba también verifica que el encabezado Content-Type se establece en application/json, lo que indica que los datos están en el formato deseado.
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes');

    expect(response.body).toHaveLength(helper.initialNotes.length);
  });

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes');

    const contents = response.body.map((r) => r.content); // se usa para crear una matriz que contiene el contenido de cada nota devuelta por la API.
    expect(contents).toContain(
      'Browser can execute only Javascript',
    ); // El método toContain se utiliza para comprobar que la nota que se le ha asignado como parámetro está en la lista de notas devueltas por la API.
  });
});

describe('viewing a specific note', () => {
  test('succeeds with a valid id', async () => {
    const notesAtStart = await helper.notesInDb();

    const noteToView = notesAtStart[0];

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const processedNoteToView = JSON.parse(JSON.stringify(noteToView));

    expect(resultNote.body).toEqual(processedNoteToView);
  });

  test('fails with statuscode 404 if note does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId();

    console.log(validNonexistingId);

    await api
      .get(`/api/notes/${validNonexistingId}`)
      .expect(404);
  });

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445';

    await api
      .get(`/api/notes/${invalidId}`)
      .expect(400);
  });
});

describe('addition of a new note', () => {
  test('succeeds with valid data', async () => {
    const newNote = {
      content: 'async/await simplifies making async calls',
      important: true,
    };

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const notesAtEnd = await helper.notesInDb();
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1);

    const contents = notesAtEnd.map((n) => n.content);
    expect(contents).toContain(
      'async/await simplifies making async calls',
    );
  });

  test('fails with status code 400 if data invalid', async () => {
    const newNote = {
      important: true,
    };

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(400);

    const notesAtEnd = await helper.notesInDb();

    expect(notesAtEnd).toHaveLength(helper.initialNotes.length);
  });
});

describe('deletion of a note', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const notesAtStart = await helper.notesInDb();
    const noteToDelete = notesAtStart[0];

    await api
      .delete(`/api/notes/${noteToDelete.id}`)
      .expect(204);

    const notesAtEnd = await helper.notesInDb();

    expect(notesAtEnd).toHaveLength(
      helper.initialNotes.length - 1,
    );

    const contents = notesAtEnd.map((r) => r.content);

    expect(contents).not.toContain(noteToDelete.content);
  });
});

// probar las cosas manualmente se volverá demasiado engorroso rápidamente, especialmente una vez que implementemos la funcionalidad que obliga a los nombres de usuario a ser únicos.
// Se necesita mucho menos esfuerzo para escribir pruebas automatizadas y hará que el desarrollo de nuestra aplicación sea mucho más fácil.
// Nuestras pruebas iniciales de usuario podrían verse así:
describe('when there is initially one user in db', () => {
  // El bloque beforeEach agrega un usuario con el nombre de usuario root a la base de datos.
  // La función se utiliza para ayudarnos a verificar el estado de la base de datos después de que se crea un usuario:
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('`username` to be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

// Una vez que todas las pruebas (actualmente solo hay una) hayan terminado de ejecutarse, tenemos que cerrar la conexión a la base de datos utilizada por Mongoose.
afterAll(() => {
  mongoose.connection.close();
});
