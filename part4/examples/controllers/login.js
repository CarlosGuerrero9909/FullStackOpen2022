const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { body } = request

  // El código comienza buscando al usuario en la base de datos por el nombre de usuario adjunto a la solicitud. A continuación, verifica la contraseña, también adjunta a la solicitud
  const user = await User.findOne({ username: body.username })

  // Debido a que las contraseñas en sí no se guardan en la base de datos, sino hash calculadas a partir de las contraseñas,
  // el método bcrypt.compare se usa para verificar si la contraseña es correcta:
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  // Si no se encuentra el usuario o la contraseña es incorrecta, se responde a la solicitud con el código de estado 401 unauthorized.
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  // Si la contraseña es correcta, se crea un token con el método jwt.sign.
  // El token contiene el nombre de usuario y la identificación de usuario en un formulario firmado digitalmente.
  const userForToken = {
    username: user.username,
    id: user._id
  }

  // El token ha sido firmado digitalmente usando una cadena de variable de entorno SECRET como secreto
  // La firma digital garantiza que solo las partes que
  // conocen el secreto puedan generar un token válido. El valor de la variable de entorno debe establecerse en el archivo .env.
  // token expires in 60*60 seconds, that is, in one hour
  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    { expiresIn: 60 * 60 }
  )

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
