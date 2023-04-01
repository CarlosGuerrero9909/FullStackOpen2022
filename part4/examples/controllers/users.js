const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  // El parámetro dado al método populate define que los objetos ids que hacen referencia a
  // note en el campo notes del documento user será reemplazado por los documentos de note referenciados.
  // Podemos usar el parámetro populate para elegir los campos que queremos incluir de los documentos. La selección de campos se realiza con la sintaxis de Mongo
  const users = await User
    .find({}).populate('notes', { content: 1, date: 1 });

  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { body } = request;

  // Con "saltRounds" en realidad se refieren al factor de costo . El factor de costo controla cuánto tiempo se necesita para calcular un solo hash de BCrypt.
  // Cuanto mayor sea el factor de costo, más rondas de hashing se realizan. Aumentar el factor de costo en 1 duplica el tiempo necesario.
  // Cuanto más tiempo es necesario, más difícil es la fuerza bruta. 10 es el valor con mejor factor de costo
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  // La contraseña enviada en la solicitud no se almacena en la base de datos. Almacenamos el hash de la contraseña que se genera con la función bcrypt.hash.
  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
