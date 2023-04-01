// Nuestro middleware personalizado se ha movido a un nuevo módulo utils/middleware.js:
const logger = require('./logger');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } if (error.name === 'JsonWebTokenError') { // La verificación del token también puede causar un error JsonWebTokenError si es que es inválido o está ausente.
    return response.status(400).json({ error: error.message });
  } if (error.name === 'TokenExpiredError') { // caso de un token caducado
    return response.status(401).json({
      error: 'token expired',
    });
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
