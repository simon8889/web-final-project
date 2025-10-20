import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import PatternPng from '@/assets/css-pattern-by-magicpattern.png'

export default function SignInForm({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col gap-4', className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-4 md:p-6">
            <FieldGroup>
              <div className="flex flex-col items-center gap-1 text-center">
                <h1 className="text-xl font-bold">Crea tu cuenta</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Ingresa tu email para crear tu cuenta
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
                <Input id="email" type="email" placeholder="tu@ejemplo.com" required />
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                    <Input id="password" type="password" required />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">Confirmar contraseña</FieldLabel>
                    <Input id="confirm-password" type="password" required />
                  </Field>
                </Field>
                <FieldDescription>Debe tener al menos 8 caracteres.</FieldDescription>
              </Field>
              <Field>
                <Button type="submit">Crear cuenta</Button>
              </Field>
              <FieldDescription className="text-center">
                ¿Ya tienes cuenta? <a href="#">Iniciar sesión</a>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src={PatternPng}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-4 text-center">
        Al continuar, aceptas nuestros <a href="#">Términos de Servicio</a> y{' '}
        <a href="#">Política de Privacidad</a>.
      </FieldDescription>
    </div>
  )
}
