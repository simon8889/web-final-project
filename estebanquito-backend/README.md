# Estebanquito Backend

Sistema bancario completo desarrollado con Node.js, Express y SQLite.

## Instalación

```bash
npm install
```

## Configuración

El archivo `.env` ya está configurado con:
- PORT=3000

## Inicializar Base de Datos

```bash
npm run init-db
```

## Ejecutar el Servidor

Modo desarrollo:
```bash
npm run dev
```

Modo producción:
```bash
npm start
```

## Endpoints Disponibles

### Autenticación (`/api/auth`)

- **POST /register** - Registrar nuevo usuario
  ```json
  {
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "password": "123456",
    "numero_cuenta": "3001234567",
    "tipo_cuenta": "ahorros"
  }
  ```

- **POST /login** - Iniciar sesión
  ```json
  {
    "email": "juan@example.com",
    "password": "123456"
  }
  ```

- **POST /logout** - Cerrar sesión

### Cuentas (`/api/cuentas`)

- **GET /mi-cuenta** - Ver información de cuenta
  - Headers: `user-id: 1`

### Transacciones (`/api/transacciones`)

- **POST /deposito** - Realizar depósito
  - Headers: `user-id: 1`
  ```json
  {
    "monto": 5000
  }
  ```

- **POST /retiro** - Realizar retiro
  - Headers: `user-id: 1`
  ```json
  {
    "monto": 1000
  }
  ```

- **POST /transferencia** - Transferir a otra cuenta
  - Headers: `user-id: 1`
  ```json
  {
    "numero_cuenta_destino": "3009876543",
    "monto": 2000
  }
  ```

- **GET /historial** - Ver historial de transacciones
  - Headers: `user-id: 1`

### Préstamos (`/api/prestamos`)

- **POST /solicitar** - Solicitar préstamo
  - Headers: `user-id: 1`
  ```json
  {
    "monto": 10000,
    "plazo": 12
  }
  ```

- **GET /mis-prestamos** - Ver préstamos del usuario
  - Headers: `user-id: 1`

- **GET /deuda-total** - Ver deuda total
  - Headers: `user-id: 1`

### Reportes (`/api/reportes`)

- **GET /ingresos-totales** - Total de ingresos
  - Headers: `user-id: 1`

- **GET /egresos-totales** - Total de egresos
  - Headers: `user-id: 1`

- **GET /deudas-pendientes** - Total de deudas pendientes
  - Headers: `user-id: 1`

## Estructura del Proyecto

```
estebanquito-backend/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── initDatabase.js
│   ├── models/
│   │   ├── Usuario.js
│   │   ├── Transaccion.js
│   │   ├── Prestamo.js
│   │   └── Reporte.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── cuentaController.js
│   │   ├── transaccionController.js
│   │   ├── prestamoController.js
│   │   └── reporteController.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── cuentas.js
│   │   ├── transacciones.js
│   │   ├── prestamos.js
│   │   └── reportes.js
│   ├── middlewares/
│   │   ├── auth.js
│   │   └── validator.js
│   └── app.js
├── database.sqlite
├── package.json
└── .env
```

## Tecnologías Utilizadas

- Node.js
- Express
- better-sqlite3
- bcrypt
- express-validator
- cors
- dotenv

## Reglas de Negocio

1. Las contraseñas se hashean con bcrypt (10 rounds)
2. Los retiros y transferencias requieren saldo suficiente
3. Los préstamos se aprueban automáticamente
4. El saldo se incrementa inmediatamente al aprobar un préstamo
5. Las transferencias se realizan usando transacciones SQL
6. Todos los números de cuenta deben ser únicos
