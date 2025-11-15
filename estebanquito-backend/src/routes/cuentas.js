const express = require('express');
const { getMiCuenta } = require('../controllers/cuentaController');
const { authenticateUser } = require('../middlewares/auth');

const router = express.Router();

router.get('/mi-cuenta', authenticateUser, getMiCuenta);

module.exports = router;
