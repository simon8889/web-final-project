const db = require('../config/database');
const Usuario = require('../models/Usuario');
const Transaccion = require('../models/Transaccion');

const deposito = (req, res) => {
  try {
    const { monto } = req.body;

    if (monto <= 0) {
      return res.status(400).json({
        success: false,
        error: 'El monto debe ser mayor a cero'
      });
    }

    const user = Usuario.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }

    const nuevoSaldo = user.saldo + monto;
    Usuario.updateSaldo(req.userId, nuevoSaldo);

    Transaccion.create({
      cuenta_id: req.userId,
      tipo: 'deposito',
      monto,
      descripcion: 'Depósito a cuenta'
    });

    res.json({
      success: true,
      data: {
        mensaje: 'Depósito realizado exitosamente',
        nuevoSaldo
      }
    });
  } catch (error) {
    console.error('Error en depósito:', error);
    res.status(500).json({
      success: false,
      error: 'Error al realizar depósito'
    });
  }
};

const retiro = (req, res) => {
  try {
    const { monto } = req.body;

    if (monto <= 0) {
      return res.status(400).json({
        success: false,
        error: 'El monto debe ser mayor a cero'
      });
    }

    const user = Usuario.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }

    if (user.saldo < monto) {
      return res.status(400).json({
        success: false,
        error: 'Saldo insuficiente'
      });
    }

    const nuevoSaldo = user.saldo - monto;
    Usuario.updateSaldo(req.userId, nuevoSaldo);

    Transaccion.create({
      cuenta_id: req.userId,
      tipo: 'retiro',
      monto,
      descripcion: 'Retiro de cuenta'
    });

    res.json({
      success: true,
      data: {
        mensaje: 'Retiro realizado exitosamente',
        nuevoSaldo
      }
    });
  } catch (error) {
    console.error('Error en retiro:', error);
    res.status(500).json({
      success: false,
      error: 'Error al realizar retiro'
    });
  }
};

const transferencia = (req, res) => {
  const transaction = db.transaction((userId, numeroCuentaDestino, monto) => {
    const userOrigen = Usuario.findById(userId);
    if (!userOrigen) {
      throw new Error('Usuario no encontrado');
    }

    if (monto <= 0) {
      throw new Error('El monto debe ser mayor a cero');
    }

    if (userOrigen.saldo < monto) {
      throw new Error('Saldo insuficiente');
    }

    const userDestino = Usuario.findByNumeroCuenta(numeroCuentaDestino);
    if (!userDestino) {
      throw new Error('Cuenta destino no encontrada');
    }

    if (userOrigen.numero_cuenta === numeroCuentaDestino) {
      throw new Error('No puedes transferir a tu propia cuenta');
    }

    Usuario.updateSaldo(userId, userOrigen.saldo - monto);
    Usuario.updateSaldo(userDestino.id, userDestino.saldo + monto);

    Transaccion.create({
      cuenta_id: userId,
      tipo: 'transferencia',
      monto,
      cuenta_destino: numeroCuentaDestino,
      descripcion: `Transferencia a ${userDestino.nombre}`
    });

    Transaccion.create({
      cuenta_id: userDestino.id,
      tipo: 'deposito',
      monto,
      cuenta_destino: userOrigen.numero_cuenta,
      descripcion: `Transferencia recibida de ${userOrigen.nombre}`
    });

    return userOrigen.saldo - monto;
  });

  try {
    const { numero_cuenta_destino, monto } = req.body;
    const nuevoSaldo = transaction(req.userId, numero_cuenta_destino, monto);

    res.json({
      success: true,
      data: {
        mensaje: 'Transferencia realizada exitosamente',
        nuevoSaldo
      }
    });
  } catch (error) {
    console.error('Error en transferencia:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Error al realizar transferencia'
    });
  }
};

const historial = (req, res) => {
  try {
    const transacciones = Transaccion.findByUsuario(req.userId);

    res.json({
      success: true,
      data: transacciones
    });
  } catch (error) {
    console.error('Error al obtener historial:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener historial de transacciones'
    });
  }
};

module.exports = { deposito, retiro, transferencia, historial };
