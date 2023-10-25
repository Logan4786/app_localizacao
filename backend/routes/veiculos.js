const express = require('express');
const router = express.Router();
const Veiculo = require('../models/veiculo');

//Rotas para CRUD de veículos
router.get('/', (req, res) => {
    //Rota para listar veiculos
});

router.post('/', (req, res) => {
    //Rota para cadastrar um veiculo
});

module.exports = router;