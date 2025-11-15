const express = require('express');
const { body } = require('express-validator');
const { register, login, logout } = require('../controllers/authController');
const { validate } = require('../middlewares/validator');

const router = express.Router();

router.post('/register', [
  body('nombre').notEmpty().withMessage('El nombre es requerido'),
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('numero_cuenta').notEmpty().withMessage('El número de cuenta es requerido'),
  body('tipo_cuenta').isIn(['ahorros', 'corriente']).withMessage('Tipo de cuenta inválido'),
  validate
], register);

router.post('/login', [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').notEmpty().withMessage('La contraseña es requerida'),
  validate
], login);

router.post('/logout', logout);

module.exports = router;
