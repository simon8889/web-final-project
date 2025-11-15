const db = require('../config/database');

class Usuario {
  static create(usuario) {
    const stmt = db.prepare(`
      INSERT INTO usuarios (nombre, email, password, numero_cuenta, tipo_cuenta, saldo)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      usuario.nombre,
      usuario.email,
      usuario.password,
      usuario.numero_cuenta,
      usuario.tipo_cuenta,
      0
    );
    return result.lastInsertRowid;
  }

  static findByEmail(email) {
    const stmt = db.prepare('SELECT * FROM usuarios WHERE email = ?');
    return stmt.get(email);
  }

  static findById(id) {
    const stmt = db.prepare('SELECT * FROM usuarios WHERE id = ?');
    return stmt.get(id);
  }

  static findByNumeroCuenta(numeroCuenta) {
    const stmt = db.prepare('SELECT * FROM usuarios WHERE numero_cuenta = ?');
    return stmt.get(numeroCuenta);
  }

  static updateSaldo(id, nuevoSaldo) {
    const stmt = db.prepare('UPDATE usuarios SET saldo = ? WHERE id = ?');
    return stmt.run(nuevoSaldo, id);
  }
}

module.exports = Usuario;
