const db = require('../config/database');

class Reporte {
  static getIngresosTotales(usuarioId) {
    const stmt = db.prepare(`
      SELECT 
        COALESCE((SELECT SUM(monto) FROM transacciones WHERE cuenta_id = ? AND tipo = 'deposito'), 0) +
        COALESCE((SELECT SUM(monto) FROM prestamos WHERE usuario_id = ? AND estado = 'aprobado'), 0) as total
    `);
    return stmt.get(usuarioId, usuarioId);
  }

  static getEgresosTotales(usuarioId) {
    const stmt = db.prepare(`
      SELECT COALESCE(SUM(monto), 0) as total
      FROM transacciones
      WHERE cuenta_id = ? AND tipo IN ('retiro', 'transferencia')
    `);
    return stmt.get(usuarioId);
  }

  static getDeudasPendientes(usuarioId) {
    const stmt = db.prepare(`
      SELECT COALESCE(SUM(monto_pendiente), 0) as total
      FROM prestamos
      WHERE usuario_id = ? AND estado = 'aprobado'
    `);
    return stmt.get(usuarioId);
  }
}

module.exports = Reporte;
