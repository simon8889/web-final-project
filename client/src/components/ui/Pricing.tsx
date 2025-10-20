'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowRight, BadgeCheck } from 'lucide-react';

const plans = [
  {
    id: 'estudiahambre',
    name: 'Estudia Hambre',
    description:
      'Para los que viven del corrientazo y el tinto aguado.',
    features: [
      'Transferencias ilimitadas entre parceros',
      'Sin cuota de manejo (así como tu bolsillo)',
      'Notificaciones cada vez que gastas',
      'Retiros gratis en cajeros aliados',
      'Soporte por WhatsApp',
    ],
    cta: '¡Siempre Gratis!',
  },
  {
    id: 'bancolombio',
    name: 'Bancolombio',
    description: 'Para el que ya le llega la mesada completa.',
    features: [
      'Todo lo de Estudia Hambre',
      'Tarjeta de crédito con cupo chimba',
      'Cashback en empanadas y domicilios',
      'Descuentos en Rappi y Netflix',
      'Asesoría financiera (pa que no te gastes todo)',
    ],
    cta: 'Suscribirse ahora',
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Papá y Mamá',
    description: 'Para los afortunados que tienen quien los patrocine.',
    features: [
      'Alertas cuando tu papá vea tus gastos',
      'Límites que tu mamá puede configurar',
      'Transferencias automáticas de mesada',
      'Soporte 24/7 (pero tus papás deciden)',
    ],
    cta: 'Hablar con los jefes',
  },
];

const Pricing = () => {
  return (
    <section id="precios" className="not-prose flex flex-col gap-16 px-8 py-24 text-center">
      <div className="flex flex-col items-center justify-center gap-8">
        <h1 className="mb-0 text-balance font-medium text-5xl tracking-tighter!">
          Planes que se acomodan a tu bolsillo
        </h1>
        <p className="mx-auto mt-0 mb-0 max-w-2xl text-balance text-lg text-muted-foreground">
          Ya sea que vivas del corrientazo o te llegue mesada completa, 
          tenemos el plan perfecto para vos. Sin letra chiquita ni sorpresas.
        </p>
        <div className="mt-8 grid w-full max-w-4xl gap-4 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              className={cn(
                'relative w-full text-left',
                plan.popular && 'ring-2 ring-primary'
              )}
              key={plan.id}
            >
              {plan.popular && (
                <Badge className="-translate-x-1/2 -translate-y-1/2 absolute top-0 left-1/2 rounded-full">
                  Más Popular
                </Badge>
              )}
              <CardHeader>
                <CardTitle className="font-medium text-xl">
                  {plan.name}
                </CardTitle>
                <CardDescription>
                  <p>{plan.description}</p>
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2">
                {plan.features.map((feature, index) => (
                  <div
                    className="flex items-center gap-2 text-muted-foreground text-sm"
                    key={index}
                  >
                    <BadgeCheck className="h-4 w-4" />
                    {feature}
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={plan.popular ? 'default' : 'secondary'}
                >
                  {plan.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;