const Usuario = require('../models/Usuario');

const getMiCuenta = (req, res) => {
  try {
    const user = Usuario.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Usuario no encontrado'
      });
    }

    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      data: userWithoutPassword
    });
  } catch (error) {
    console.error('Error al obtener cuenta:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener información de la cuenta'
    });
  }
};

module.exports = { getMiCuenta };
