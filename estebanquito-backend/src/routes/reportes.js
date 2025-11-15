const express = require('express');
const { ingresosTotales, egresosTotales, deudasPendientes } = require('../controllers/reporteController');
const { authenticateUser } = require('../middlewares/auth');

const router = express.Router();

router.get('/ingresos-totales', authenticateUser, ingresosTotales);

router.get('/egresos-totales', authenticateUser, egresosTotales);

router.get('/deudas-pendientes', authenticateUser, deudasPendientes);

module.exports = router;
