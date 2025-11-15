const express = require('express');
const { body } = require('express-validator');
const { deposito, retiro, transferencia, historial } = require('../controllers/transaccionController');
const { authenticateUser } = require('../middlewares/auth');
const { validate } = require('../middlewares/validator');

const router = express.Router();

router.post('/deposito', authenticateUser, [
  body('monto').isFloat({ gt: 0 }).withMessage('El monto debe ser mayor a cero'),
  validate
], deposito);

router.post('/retiro', authenticateUser, [
  body('monto').isFloat({ gt: 0 }).withMessage('El monto debe ser mayor a cero'),
  validate
], retiro);

router.post('/transferencia', authenticateUser, [
  body('numero_cuenta_destino').notEmpty().withMessage('El número de cuenta destino es requerido'),
  body('monto').isFloat({ gt: 0 }).withMessage('El monto debe ser mayor a cero'),
  validate
], transferencia);

router.get('/historial', authenticateUser, historial);

module.exports = router;
