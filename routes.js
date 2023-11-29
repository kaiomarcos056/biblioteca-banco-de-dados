const express = require('express'); // CONEXAO
const route = express.Router(); // TRATA AS ROTAS

const homeController = require('./src/controllers/homeController'); // CHAMANDO O CONTROLADOR DA HOME

route.get('/', homeController.home);

module.exports = route; // EXPORTANDO O ROUTES