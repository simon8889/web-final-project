import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import type { Transaccion, Prestamo } from '@/services/types'
import { transaccionService, prestamoService, reporteService } from '@/services/api'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field, FieldLabel, FieldGroup } from '@/components/ui/field'
import { Separator } from '@/components/ui/separator'

export default function DashboardPage() {
  const { user, logout, refreshUser } = useAuth()
  const [transacciones, setTransacciones] = useState<Transaccion[]>([])
  const [prestamos, setPrestamos] = useState<Prestamo[]>([])
  const [reportes, setReportes] = useState({
    ingresos: 0,
    egresos: 0,
    deudas: 0,
  })
  const [activeTab, setActiveTab] = useState<'cuenta' | 'transacciones' | 'prestamos' | 'reportes'>('cuenta')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [depositoMonto, setDepositoMonto] = useState('')
  const [retiroMonto, setRetiroMonto] = useState('')
  const [transferenciaMonto, setTransferenciaMonto] = useState('')
  const [transferenciaCuenta, setTransferenciaCuenta] = useState('')
  const [prestamoMonto, setPrestamoMonto] = useState('')
  const [prestamoPlazo, setPrestamoPlazo] = useState('')

  useEffect(() => {
    loadData()
  }, [activeTab])

  const loadData = async () => {
    setIsLoading(true)
    setError('')
    try {
      if (activeTab === 'transacciones') {
        const response = await transaccionService.getHistorial()
        if (response.success && response.data) {
          setTransacciones(response.data)
        }
      } else if (activeTab === 'prestamos') {
        const response = await prestamoService.getMisPrestamos()
        if (response.success && response.data) {
          setPrestamos(response.data)
        }
      } else if (activeTab === 'reportes') {
        const [ingresos, egresos, deudas] = await Promise.all([
          reporteService.getIngresosTotales(),
          reporteService.getEgresosTotales(),
          reporteService.getDeudasPendientes(),
        ])
        setReportes({
          ingresos: ingresos.data?.ingresosTotales || 0,
          egresos: egresos.data?.egresosTotales || 0,
          deudas: deudas.data?.deudasPendientes || 0,
        })
      }
    } catch (err) {
      setError('Error al cargar datos')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeposito = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)
    try {
      const response = await transaccionService.deposito(Number(depositoMonto))
      if (response.success) {
        setSuccess(response.data?.mensaje || 'Depósito realizado')
        setDepositoMonto('')
        await refreshUser()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al realizar depósito')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRetiro = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)
    try {
      const response = await transaccionService.retiro(Number(retiroMonto))
      if (response.success) {
        setSuccess(response.data?.mensaje || 'Retiro realizado')
        setRetiroMonto('')
        await refreshUser()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al realizar retiro')
    } finally {
      setIsLoading(false)
    }
  }

  const handleTransferencia = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)
    try {
      const response = await transaccionService.transferencia(
        transferenciaCuenta,
        Number(transferenciaMonto)
      )
      if (response.success) {
        setSuccess(response.data?.mensaje || 'Transferencia realizada')
        setTransferenciaMonto('')
        setTransferenciaCuenta('')
        await refreshUser()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al realizar transferencia')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePrestamo = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)
    try {
      const response = await prestamoService.solicitar(
        Number(prestamoMonto),
        Number(prestamoPlazo)
      )
      if (response.success) {
        setSuccess(response.data?.mensaje || 'Préstamo aprobado')
        setPrestamoMonto('')
        setPrestamoPlazo('')
        await refreshUser()
        loadData()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al solicitar préstamo')
    } finally {
      setIsLoading(false)
    }
  }

  const formatMonto = (monto: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    }).format(monto)
  }

  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard - EsteBanquito</h1>
          <p className="text-muted-foreground">Bienvenido, {user?.nombre}</p>
        </div>
        <Button variant="outline" onClick={logout}>
          Cerrar sesión
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 text-green-600 p-4 rounded-md mb-4">
          {success}
        </div>
      )}

      <div className="flex gap-2 mb-6 flex-wrap">
        <Button
          variant={activeTab === 'cuenta' ? 'default' : 'outline'}
          onClick={() => setActiveTab('cuenta')}
        >
          Mi Cuenta
        </Button>
        <Button
          variant={activeTab === 'transacciones' ? 'default' : 'outline'}
          onClick={() => setActiveTab('transacciones')}
        >
          Transacciones
        </Button>
        <Button
          variant={activeTab === 'prestamos' ? 'default' : 'outline'}
          onClick={() => setActiveTab('prestamos')}
        >
          Préstamos
        </Button>
        <Button
          variant={activeTab === 'reportes' ? 'default' : 'outline'}
          onClick={() => setActiveTab('reportes')}
        >
          Reportes
        </Button>
      </div>

      {activeTab === 'cuenta' && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold">Información de Cuenta</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Nombre</p>
                <p className="text-lg font-semibold">{user?.nombre}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-lg">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Número de cuenta</p>
                <p className="text-lg font-mono">{user?.numero_cuenta}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tipo de cuenta</p>
                <p className="text-lg capitalize">{user?.tipo_cuenta}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Saldo actual</p>
                <p className="text-3xl font-bold text-green-600">
                  {formatMonto(user?.saldo || 0)}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <h3 className="text-xl font-bold">Depositar</h3>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleDeposito}>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="deposito">Monto</FieldLabel>
                      <Input
                        id="deposito"
                        type="number"
                        min="1"
                        step="0.01"
                        value={depositoMonto}
                        onChange={(e) => setDepositoMonto(e.target.value)}
                        required
                      />
                    </Field>
                    <Button type="submit" disabled={isLoading}>
                      Depositar
                    </Button>
                  </FieldGroup>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-xl font-bold">Retirar</h3>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRetiro}>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="retiro">Monto</FieldLabel>
                      <Input
                        id="retiro"
                        type="number"
                        min="1"
                        step="0.01"
                        value={retiroMonto}
                        onChange={(e) => setRetiroMonto(e.target.value)}
                        required
                      />
                    </Field>
                    <Button type="submit" disabled={isLoading}>
                      Retirar
                    </Button>
                  </FieldGroup>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-xl font-bold">Transferir</h3>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTransferencia}>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="transferenciaCuenta">
                        Número de cuenta destino
                      </FieldLabel>
                      <Input
                        id="transferenciaCuenta"
                        type="text"
                        value={transferenciaCuenta}
                        onChange={(e) => setTransferenciaCuenta(e.target.value)}
                        required
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="transferenciaMonto">Monto</FieldLabel>
                      <Input
                        id="transferenciaMonto"
                        type="number"
                        min="1"
                        step="0.01"
                        value={transferenciaMonto}
                        onChange={(e) => setTransferenciaMonto(e.target.value)}
                        required
                      />
                    </Field>
                    <Button type="submit" disabled={isLoading}>
                      Transferir
                    </Button>
                  </FieldGroup>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'transacciones' && (
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold">Historial de Transacciones</h2>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Cargando...</p>
            ) : transacciones.length === 0 ? (
              <p className="text-muted-foreground">No hay transacciones</p>
            ) : (
              <div className="space-y-4">
                {transacciones.map((t) => (
                  <div
                    key={t.id}
                    className="flex justify-between items-start p-4 border rounded-lg"
                  >
                    <div>
                      <p className="font-semibold capitalize">{t.tipo}</p>
                      <p className="text-sm text-muted-foreground">{t.descripcion}</p>
                      {t.cuenta_destino && (
                        <p className="text-sm text-muted-foreground">
                          Cuenta: {t.cuenta_destino}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">{formatFecha(t.fecha)}</p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-lg font-bold ${
                          t.tipo === 'deposito' ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {t.tipo === 'deposito' ? '+' : '-'}
                        {formatMonto(t.monto)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === 'prestamos' && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold">Solicitar Préstamo</h2>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePrestamo}>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="prestamoMonto">Monto</FieldLabel>
                    <Input
                      id="prestamoMonto"
                      type="number"
                      min="1"
                      step="0.01"
                      value={prestamoMonto}
                      onChange={(e) => setPrestamoMonto(e.target.value)}
                      required
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="prestamoPlazo">Plazo (meses)</FieldLabel>
                    <Input
                      id="prestamoPlazo"
                      type="number"
                      min="1"
                      value={prestamoPlazo}
                      onChange={(e) => setPrestamoPlazo(e.target.value)}
                      required
                    />
                  </Field>
                  <Button type="submit" disabled={isLoading}>
                    Solicitar Préstamo
                  </Button>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold">Mis Préstamos</h2>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p>Cargando...</p>
              ) : prestamos.length === 0 ? (
                <p className="text-muted-foreground">No tienes préstamos</p>
              ) : (
                <div className="space-y-4">
                  {prestamos.map((p) => (
                    <div key={p.id} className="p-4 border rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span className="font-semibold">Monto:</span>
                        <span>{formatMonto(p.monto)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Plazo:</span>
                        <span>{p.plazo} meses</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Estado:</span>
                        <span className="capitalize">{p.estado}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Deuda pendiente:</span>
                        <span className="text-red-600 font-bold">
                          {formatMonto(p.monto_pendiente)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Solicitado: {formatFecha(p.fecha_solicitud)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'reportes' && (
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Ingresos Totales</h3>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">
                {formatMonto(reportes.ingresos)}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Suma de depósitos y préstamos recibidos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Egresos Totales</h3>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-600">
                {formatMonto(reportes.egresos)}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Suma de retiros y transferencias
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Deudas Pendientes</h3>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-orange-600">
                {formatMonto(reportes.deudas)}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Total de préstamos sin pagar
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
