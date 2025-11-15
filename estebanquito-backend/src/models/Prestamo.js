const db = require('../config/database');

class Prestamo {
  static create(prestamo) {
    const stmt = db.prepare(`
      INSERT INTO prestamos (usuario_id, monto, plazo, estado, monto_pendiente)
      VALUES (?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      prestamo.usuario_id,
      prestamo.monto,
      prestamo.plazo,
      prestamo.estado || 'aprobado',
      prestamo.monto_pendiente
    );
    return result.lastInsertRowid;
  }

  static findByUsuario(usuarioId) {
    const stmt = db.prepare(`
      SELECT * FROM prestamos 
      WHERE usuario_id = ? 
      ORDER BY fecha_solicitud DESC
    `);
    return stmt.all(usuarioId);
  }

  static getDeudaTotal(usuarioId) {
    const stmt = db.prepare(`
      SELECT COALESCE(SUM(monto_pendiente), 0) as total
      FROM prestamos
      WHERE usuario_id = ? AND estado = 'aprobado'
    `);
    return stmt.get(usuarioId);
  }
}

module.exports = Prestamo;
