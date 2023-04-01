// El archivo index.js solo importa la aplicación real desde el archivo app.js y luego inicia la aplicación.
// La función info del módulo de registro se utiliza para la impresión de la consola que indica que la aplicación se está ejecutando.
const http = require('http');
const app = require('./app'); // varsinainen Express-sovellus
const config = require('./utils/config');
const logger = require('./utils/logger');

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
