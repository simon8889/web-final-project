'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const Contact = () => {
  return (
    <section id="contacto" className="mx-auto max-w-2xl px-8 py-16">
      <div className="mb-8 text-center">
        <h1 className="mb-2 font-semibold text-4xl tracking-tight">Contáctanos</h1>
        <p className="text-balance text-lg text-muted-foreground">
          ¿Tienes alguna duda? Escríbenos y te respondemos lo más pronto posible
        </p>
      </div>

      <form className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre</Label>
            <Input id="nombre" placeholder="Tu nombre" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="tu@email.com" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="asunto">Asunto</Label>
          <Input id="asunto" placeholder="¿En qué podemos ayudarte?" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mensaje">Mensaje</Label>
          <Textarea
            id="mensaje"
            placeholder="Cuéntanos más sobre tu consulta..."
            rows={5}
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Enviar Mensaje
        </Button>
      </form>
    </section>
  )
}

export default Contact
