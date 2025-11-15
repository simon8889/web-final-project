const db = require('../config/database');

class Transaccion {
  static create(transaccion) {
    const stmt = db.prepare(`
      INSERT INTO transacciones (cuenta_id, tipo, monto, cuenta_destino, descripcion)
      VALUES (?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      transaccion.cuenta_id,
      transaccion.tipo,
      transaccion.monto,
      transaccion.cuenta_destino || null,
      transaccion.descripcion || null
    );
    return result.lastInsertRowid;
  }

  static findByUsuario(usuarioId) {
    const stmt = db.prepare(`
      SELECT * FROM transacciones 
      WHERE cuenta_id = ? 
      ORDER BY fecha DESC
    `);
    return stmt.all(usuarioId);
  }

  static getDepositos(usuarioId) {
    const stmt = db.prepare(`
      SELECT COALESCE(SUM(monto), 0) as total
      FROM transacciones
      WHERE cuenta_id = ? AND tipo = 'deposito'
    `);
    return stmt.get(usuarioId);
  }

  static getEgresos(usuarioId) {
    const stmt = db.prepare(`
      SELECT COALESCE(SUM(monto), 0) as total
      FROM transacciones
      WHERE cuenta_id = ? AND tipo IN ('retiro', 'transferencia')
    `);
    return stmt.get(usuarioId);
  }
}

module.exports = Transaccion;
