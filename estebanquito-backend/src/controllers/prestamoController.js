const Usuario = require('../models/Usuario');
const Prestamo = require('../models/Prestamo');

const solicitarPrestamo = (req, res) => {
  try {
    const { monto, plazo } = req.body;

    if (monto <= 0) {
      return res.status(400).json({
        success: false,
        error: 'El monto debe ser mayor a cero'
      });
    }

    if (plazo <= 0) {
      return res.status(400).json({
        success: false,
        error: 'El plazo debe ser mayor a cero'
      });
    }

    const user = Usuario.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }

    const prestamoId = Prestamo.create({
      usuario_id: req.userId,
      monto,
      plazo,
      estado: 'aprobado',
      monto_pendiente: monto
    });

    const nuevoSaldo = user.saldo + monto;
    Usuario.updateSaldo(req.userId, nuevoSaldo);

    const prestamo = Prestamo.findByUsuario(req.userId).find(p => p.id === prestamoId);

    res.status(201).json({
      success: true,
      data: {
        mensaje: 'Préstamo aprobado y depositado',
        prestamo,
        nuevoSaldo
      }
    });
  } catch (error) {
    console.error('Error al solicitar préstamo:', error);
    res.status(500).json({
      success: false,
      error: 'Error al solicitar préstamo'
    });
  }
};

const misPrestamos = (req, res) => {
  try {
    const prestamos = Prestamo.findByUsuario(req.userId);

    res.json({
      success: true,
      data: prestamos
    });
  } catch (error) {
    console.error('Error al obtener préstamos:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener préstamos'
    });
  }
};

const deudaTotal = (req, res) => {
  try {
    const deuda = Prestamo.getDeudaTotal(req.userId);

    res.json({
      success: true,
      data: {
        deudaTotal: deuda.total
      }
    });
  } catch (error) {
    console.error('Error al obtener deuda total:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener deuda total'
    });
  }
};

module.exports = { solicitarPrestamo, misPrestamos, deudaTotal };
