const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

const register = async (req, res) => {
  try {
    const { nombre, email, password, numero_cuenta, tipo_cuenta } = req.body;

    const existingEmail = Usuario.findByEmail(email);
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        error: 'El email ya está registrado'
      });
    }

    const existingCuenta = Usuario.findByNumeroCuenta(numero_cuenta);
    if (existingCuenta) {
      return res.status(400).json({
        success: false,
        error: 'El número de cuenta ya está registrado'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = Usuario.create({
      nombre,
      email,
      password: hashedPassword,
      numero_cuenta,
      tipo_cuenta
    });

    const user = Usuario.findById(userId);
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      success: true,
      data: userWithoutPassword
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({
      success: false,
      error: 'Error al registrar usuario'
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = Usuario.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Credenciales inválidas'
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        error: 'Credenciales inválidas'
      });
    }

    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      data: userWithoutPassword
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      error: 'Error al iniciar sesión'
    });
  }
};

const logout = (req, res) => {
  res.json({
    success: true,
    data: { message: 'Sesión cerrada correctamente' }
  });
};

module.exports = { register, login, logout };
