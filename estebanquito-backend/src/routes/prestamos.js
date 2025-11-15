const express = require('express');
const { body } = require('express-validator');
const { solicitarPrestamo, misPrestamos, deudaTotal } = require('../controllers/prestamoController');
const { authenticateUser } = require('../middlewares/auth');
const { validate } = require('../middlewares/validator');

const router = express.Router();

router.post('/solicitar', authenticateUser, [
  body('monto').isFloat({ gt: 0 }).withMessage('El monto debe ser mayor a cero'),
  body('plazo').isInt({ gt: 0 }).withMessage('El plazo debe ser mayor a cero'),
  validate
], solicitarPrestamo);

router.get('/mis-prestamos', authenticateUser, misPrestamos);

router.get('/deuda-total', authenticateUser, deudaTotal);

module.exports = router;
