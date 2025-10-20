import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import PatternPng from '@/assets/css-pattern-by-magicpattern.png'

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="bg-muted relative hidden md:block">
            <img
              src={PatternPng}
              alt="Patrón decorativo para formulario de inicio de sesión"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
          <form className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Bienvenido de vuelta</h1>
                <p className="text-muted-foreground text-balance">
                  Inicia sesión en tu cuenta de EsteBanquito
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
                <Input id="email" type="email" placeholder="tu@ejemplo.com" required />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                  <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit">Iniciar sesión</Button>
              </Field>
              <FieldDescription className="text-center">
                ¿No tienes cuenta? <a href="#">Regístrate</a>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        Al continuar, aceptas nuestros <a href="#">Términos de Servicio</a> y{' '}
        <a href="#">Política de Privacidad</a>.
      </FieldDescription>
    </div>
  )
}
