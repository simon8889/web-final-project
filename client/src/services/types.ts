export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export interface Usuario {
  id: number
  nombre: string
  email: string
  numero_cuenta: string
  tipo_cuenta: 'ahorros' | 'corriente'
  saldo: number
  created_at: string
}

export interface Transaccion {
  id: number
  cuenta_id: number
  tipo: 'deposito' | 'retiro' | 'transferencia'
  monto: number
  cuenta_destino: string | null
  descripcion: string | null
  fecha: string
}

export interface Prestamo {
  id: number
  usuario_id: number
  monto: number
  plazo: number
  estado: 'pendiente' | 'aprobado' | 'rechazado'
  monto_pendiente: number
  fecha_solicitud: string
}
