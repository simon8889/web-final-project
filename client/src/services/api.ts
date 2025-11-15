import type { ApiResponse, Usuario, Transaccion, Prestamo } from './types'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export type { ApiResponse, Usuario, Transaccion, Prestamo }

const getHeaders = () => {
  const userId = localStorage.getItem('userId')
  return {
    'Content-Type': 'application/json',
    ...(userId && { 'user-id': userId }),
  }
}

const handleResponse = async <T,>(response: Response): Promise<ApiResponse<T>> => {
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.error || 'Error en la petición')
  }
  return data
}

export const authService = {
  register: async (userData: {
    nombre: string
    email: string
    password: string
    numero_cuenta: string
    tipo_cuenta: 'ahorros' | 'corriente'
  }): Promise<ApiResponse<Usuario>> => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
    return handleResponse<Usuario>(response)
  },

  login: async (credentials: { email: string; password: string }): Promise<ApiResponse<Usuario>> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })
    return handleResponse<Usuario>(response)
  },

  logout: async (): Promise<ApiResponse<{ message: string }>> => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: getHeaders(),
    })
    return handleResponse(response)
  },
}

export const cuentaService = {
  getMiCuenta: async (): Promise<ApiResponse<Usuario>> => {
    const response = await fetch(`${API_BASE_URL}/cuentas/mi-cuenta`, {
      headers: getHeaders(),
    })
    return handleResponse<Usuario>(response)
  },
}

export const transaccionService = {
  deposito: async (monto: number): Promise<ApiResponse<{ mensaje: string; nuevoSaldo: number }>> => {
    const response = await fetch(`${API_BASE_URL}/transacciones/deposito`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ monto }),
    })
    return handleResponse(response)
  },

  retiro: async (monto: number): Promise<ApiResponse<{ mensaje: string; nuevoSaldo: number }>> => {
    const response = await fetch(`${API_BASE_URL}/transacciones/retiro`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ monto }),
    })
    return handleResponse(response)
  },

  transferencia: async (
    numero_cuenta_destino: string,
    monto: number
  ): Promise<ApiResponse<{ mensaje: string; nuevoSaldo: number }>> => {
    const response = await fetch(`${API_BASE_URL}/transacciones/transferencia`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ numero_cuenta_destino, monto }),
    })
    return handleResponse(response)
  },

  getHistorial: async (): Promise<ApiResponse<Transaccion[]>> => {
    const response = await fetch(`${API_BASE_URL}/transacciones/historial`, {
      headers: getHeaders(),
    })
    return handleResponse<Transaccion[]>(response)
  },
}

export const prestamoService = {
  solicitar: async (
    monto: number,
    plazo: number
  ): Promise<ApiResponse<{ mensaje: string; prestamo: Prestamo; nuevoSaldo: number }>> => {
    const response = await fetch(`${API_BASE_URL}/prestamos/solicitar`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ monto, plazo }),
    })
    return handleResponse(response)
  },

  getMisPrestamos: async (): Promise<ApiResponse<Prestamo[]>> => {
    const response = await fetch(`${API_BASE_URL}/prestamos/mis-prestamos`, {
      headers: getHeaders(),
    })
    return handleResponse<Prestamo[]>(response)
  },

  getDeudaTotal: async (): Promise<ApiResponse<{ deudaTotal: number }>> => {
    const response = await fetch(`${API_BASE_URL}/prestamos/deuda-total`, {
      headers: getHeaders(),
    })
    return handleResponse(response)
  },
}

export const reporteService = {
  getIngresosTotales: async (): Promise<ApiResponse<{ ingresosTotales: number }>> => {
    const response = await fetch(`${API_BASE_URL}/reportes/ingresos-totales`, {
      headers: getHeaders(),
    })
    return handleResponse(response)
  },

  getEgresosTotales: async (): Promise<ApiResponse<{ egresosTotales: number }>> => {
    const response = await fetch(`${API_BASE_URL}/reportes/egresos-totales`, {
      headers: getHeaders(),
    })
    return handleResponse(response)
  },

  getDeudasPendientes: async (): Promise<ApiResponse<{ deudasPendientes: number }>> => {
    const response = await fetch(`${API_BASE_URL}/reportes/deudas-pendientes`, {
      headers: getHeaders(),
    })
    return handleResponse(response)
  },
}
