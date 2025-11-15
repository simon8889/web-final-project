import React, { createContext, useContext, useState, useEffect } from 'react'
import type { Usuario } from '@/services/types'
import { authService, cuentaService } from '@/services/api'

interface AuthContextType {
  user: Usuario | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: {
    nombre: string
    email: string
    password: string
    numero_cuenta: string
    tipo_cuenta: 'ahorros' | 'corriente'
  }) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Usuario | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    if (userId) {
      refreshUser()
    } else {
      setIsLoading(false)
    }
  }, [])

  const refreshUser = async () => {
    try {
      setIsLoading(true)
      const response = await cuentaService.getMiCuenta()
      if (response.success && response.data) {
        setUser(response.data)
      } else {
        localStorage.removeItem('userId')
        setUser(null)
      }
    } catch (error) {
      console.error('Error al obtener usuario:', error)
      localStorage.removeItem('userId')
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password })
    if (response.success && response.data) {
      localStorage.setItem('userId', response.data.id.toString())
      setUser(response.data)
    } else {
      throw new Error(response.error || 'Error al iniciar sesión')
    }
  }

  const register = async (userData: {
    nombre: string
    email: string
    password: string
    numero_cuenta: string
    tipo_cuenta: 'ahorros' | 'corriente'
  }) => {
    const response = await authService.register(userData)
    if (response.success && response.data) {
      localStorage.setItem('userId', response.data.id.toString())
      setUser(response.data)
    } else {
      throw new Error(response.error || 'Error al registrar usuario')
    }
  }

  const logout = async () => {
    await authService.logout()
    localStorage.removeItem('userId')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }
  return context
}
