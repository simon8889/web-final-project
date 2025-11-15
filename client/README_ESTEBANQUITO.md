# EsteBanquito - Cliente Frontend

Aplicación bancaria completa con React, TypeScript y Vite conectada al backend de EsteBanquito.

## Características Implementadas

### Autenticación
- ✅ Registro de nuevos usuarios
- ✅ Inicio de sesión
- ✅ Cierre de sesión
- ✅ Protección de rutas privadas
- ✅ Persistencia de sesión

### Dashboard
- ✅ Visualización de información de cuenta
- ✅ Saldo en tiempo real
- ✅ Depósitos
- ✅ Retiros
- ✅ Transferencias entre cuentas
- ✅ Historial de transacciones
- ✅ Solicitud de préstamos
- ✅ Gestión de préstamos
- ✅ Reportes financieros (ingresos, egresos, deudas)

## Instalación

```bash
npm install
```

## Configuración

El archivo `.env` ya está configurado con:
```
VITE_API_URL=http://localhost:3000/api
```

Asegúrate de que el backend esté ejecutándose en `http://localhost:3000`

## Ejecutar en Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Compilar para Producción

```bash
npm run build
```

## Estructura del Proyecto

```
client/src/
├── components/
│   ├── layout/           # Layouts de la aplicación
│   ├── ui/              # Componentes UI reutilizables
│   ├── LoginForm.tsx    # Formulario de login (funcional)
│   ├── SignInForm.tsx   # Formulario de registro (funcional)
│   └── ProtectedRoute.tsx # Protección de rutas
├── context/
│   └── AuthContext.tsx  # Contexto de autenticación
├── pages/
│   ├── public/          # Páginas públicas
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   └── SignInPage.tsx
│   └── dashboard/       # Páginas privadas
│       └── DashboardPage.tsx # Dashboard completo
├── services/
│   └── api.ts           # Servicios de API
└── router/
    └── index.tsx        # Configuración de rutas
```

## Rutas Disponibles

### Públicas
- `/` - Página de inicio
- `/auth/login` - Inicio de sesión
- `/auth/signin` - Registro de usuario

### Privadas (requieren autenticación)
- `/dashboard` - Panel de control principal

## Uso

### 1. Registro
1. Ve a `/auth/signin`
2. Completa el formulario:
   - Nombre completo
   - Correo electrónico
   - Número de cuenta (único)
   - Tipo de cuenta (ahorros/corriente)
   - Contraseña (mínimo 6 caracteres)
3. Serás redirigido automáticamente al dashboard

### 2. Inicio de Sesión
1. Ve a `/auth/login`
2. Ingresa tu email y contraseña
3. Accede al dashboard

### 3. Dashboard

#### Pestaña Mi Cuenta
- Ver información personal
- Ver saldo actual
- Realizar depósitos
- Realizar retiros
- Hacer transferencias a otras cuentas

#### Pestaña Transacciones
- Ver historial completo de transacciones
- Información detallada de cada movimiento

#### Pestaña Préstamos
- Solicitar nuevos préstamos
- Ver préstamos activos
- Consultar deuda pendiente

#### Pestaña Reportes
- Ingresos totales (depósitos + préstamos)
- Egresos totales (retiros + transferencias)
- Deudas pendientes

## Servicios de API

Todos los servicios están en `src/services/api.ts`:

### authService
- `register()` - Registrar usuario
- `login()` - Iniciar sesión
- `logout()` - Cerrar sesión

### cuentaService
- `getMiCuenta()` - Obtener información de cuenta

### transaccionService
- `deposito()` - Realizar depósito
- `retiro()` - Realizar retiro
- `transferencia()` - Transferir dinero
- `getHistorial()` - Obtener historial

### prestamoService
- `solicitar()` - Solicitar préstamo
- `getMisPrestamos()` - Obtener préstamos
- `getDeudaTotal()` - Obtener deuda total

### reporteService
- `getIngresosTotales()` - Obtener ingresos
- `getEgresosTotales()` - Obtener egresos
- `getDeudasPendientes()` - Obtener deudas

## Tecnologías

- **React 19** - Framework UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool
- **React Router 7** - Enrutamiento
- **Tailwind CSS 4** - Estilos
- **Shadcn UI** - Componentes UI
- **Lucide React** - Iconos

## Notas Importantes

- La autenticación se maneja con `localStorage` guardando el `userId`
- Todas las peticiones autenticadas incluyen el header `user-id`
- Los montos se formatean en COP (Pesos Colombianos)
- Las validaciones del lado del cliente coinciden con el backend
- Los errores se muestran de manera amigable al usuario
