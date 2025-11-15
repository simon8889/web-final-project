# Estebanquito - Sistema Bancario Completo

Sistema bancario full-stack con funcionalidades de gestión de cuentas, transacciones, préstamos y reportes.

## 📁 Estructura del Proyecto

```
web-final-project/
├── estebanquito-backend/    # Backend Node.js + Express + SQLite
└── client/                   # Frontend React + TypeScript
```

## 🚀 Inicio Rápido

### 1. Backend

```bash
cd estebanquito-backend
npm install
npm run init-db
npm start
```

El backend estará en `http://localhost:3000`

### 2. Frontend

```bash
cd client
npm install
npm run dev
```

El frontend estará en `http://localhost:5173`

## ✨ Funcionalidades

### Backend (Node.js + Express + SQLite)

- ✅ Autenticación con bcrypt
- ✅ Gestión de usuarios y cuentas
- ✅ Depósitos, retiros y transferencias
- ✅ Sistema de préstamos automático
- ✅ Historial de transacciones
- ✅ Reportes financieros
- ✅ Validaciones con express-validator
- ✅ Transacciones SQL para operaciones críticas
- ✅ API RESTful completa

### Frontend (React + TypeScript + Vite)

- ✅ Interfaz moderna con Tailwind CSS
- ✅ Autenticación y protección de rutas
- ✅ Dashboard interactivo
- ✅ Gestión de transacciones en tiempo real
- ✅ Solicitud y gestión de préstamos
- ✅ Reportes financieros visuales
- ✅ Formularios validados
- ✅ Manejo de errores amigable

## 📚 Documentación Detallada

- [Backend README](./estebanquito-backend/README.md)
- [Frontend README](./client/README_ESTEBANQUITO.md)

## 🛠️ Stack Tecnológico

### Backend
- Node.js
- Express
- SQLite (better-sqlite3)
- bcrypt
- express-validator
- CORS

### Frontend
- React 19
- TypeScript
- Vite
- React Router 7
- Tailwind CSS 4
- Shadcn UI

## 📝 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registro
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout

### Cuentas
- `GET /api/cuentas/mi-cuenta` - Ver cuenta

### Transacciones
- `POST /api/transacciones/deposito` - Depositar
- `POST /api/transacciones/retiro` - Retirar
- `POST /api/transacciones/transferencia` - Transferir
- `GET /api/transacciones/historial` - Historial

### Préstamos
- `POST /api/prestamos/solicitar` - Solicitar
- `GET /api/prestamos/mis-prestamos` - Ver préstamos
- `GET /api/prestamos/deuda-total` - Ver deuda

### Reportes
- `GET /api/reportes/ingresos-totales` - Ingresos
- `GET /api/reportes/egresos-totales` - Egresos
- `GET /api/reportes/deudas-pendientes` - Deudas

## 🔐 Seguridad

- Contraseñas hasheadas con bcrypt (10 rounds)
- Validación de sesión con headers
- Validación de datos en backend y frontend
- Protección contra inyección SQL con prepared statements
- CORS configurado

## 📊 Base de Datos

SQLite con 3 tablas principales:
- **usuarios** - Información de cuentas
- **transacciones** - Historial de movimientos
- **prestamos** - Gestión de préstamos

## 🎯 Uso

1. Registra una cuenta en `/auth/signin`
2. Inicia sesión en `/auth/login`
3. Accede al dashboard en `/dashboard`
4. Realiza operaciones bancarias:
   - Depósitos y retiros
   - Transferencias entre cuentas
   - Solicitud de préstamos
   - Consulta de reportes

## 👨‍💻 Desarrollo

El proyecto está completamente funcional y listo para usar sin comentarios en el código como se solicitó.
