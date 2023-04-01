// El manejo de las variables de entorno se extrae en un archivo utils/config.js separado
require('dotenv').config();

const { PORT } = process.env;
let { MONGODB_URI } = process.env;

// El archivo .env tiene variables independientes para las direcciones de la base de datos de desarrollo y prueba
if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI;
}

module.exports = {
  MONGODB_URI,
  PORT,
};
