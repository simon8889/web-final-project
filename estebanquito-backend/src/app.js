require('dotenv').config();
const express = require('express');
const cors = require('cors');
const initDatabase = require('./config/initDatabase');

const authRoutes = require('./routes/auth');
const cuentasRoutes = require('./routes/cuentas');
const transaccionesRoutes = require('./routes/transacciones');
const prestamosRoutes = require('./routes/prestamos');
const reportesRoutes = require('./routes/reportes');

const app = express();
const PORT = process.env.PORT || 3000;

initDatabase();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/cuentas', cuentasRoutes);
app.use('/api/transacciones', transaccionesRoutes);
app.use('/api/prestamos', prestamosRoutes);
app.use('/api/reportes', reportesRoutes);

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API Estebanquito - Sistema Bancario',
    version: '1.0.0'
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor Estebanquito ejecutándose en http://localhost:${PORT}`);
});

module.exports = app;
