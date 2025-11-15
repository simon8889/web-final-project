const Reporte = require('../models/Reporte');

const ingresosTotales = (req, res) => {
  try {
    const ingresos = Reporte.getIngresosTotales(req.userId);

    res.json({
      success: true,
      data: {
        ingresosTotales: ingresos.total
      }
    });
  } catch (error) {
    console.error('Error al obtener ingresos totales:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener ingresos totales'
    });
  }
};

const egresosTotales = (req, res) => {
  try {
    const egresos = Reporte.getEgresosTotales(req.userId);

    res.json({
      success: true,
      data: {
        egresosTotales: egresos.total
      }
    });
  } catch (error) {
    console.error('Error al obtener egresos totales:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener egresos totales'
    });
  }
};

const deudasPendientes = (req, res) => {
  try {
    const deudas = Reporte.getDeudasPendientes(req.userId);

    res.json({
      success: true,
      data: {
        deudasPendientes: deudas.total
      }
    });
  } catch (error) {
    console.error('Error al obtener deudas pendientes:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener deudas pendientes'
    });
  }
};

module.exports = { ingresosTotales, egresosTotales, deudasPendientes };
