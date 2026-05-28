const knex = require('knex');
const config = require('./knexfile');

// Cria a conexão usando o ambiente "development"
const knexConnection = knex(config.development);

// Exporta para usar nos DAOs
module.exports = knexConnection;