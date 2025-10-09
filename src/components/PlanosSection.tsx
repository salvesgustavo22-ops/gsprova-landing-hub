import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Shield } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const planos = [
  {
    id: 'correcao',
    titulo: 'Pacote de 2 correções de redação',
    preco: 'R$ 29,90 em até 6x',
    bullets: [
      '2 correções com devolutiva objetiva pelos critérios do ENEM',
      'Recomendações práticas para ganhar pontos',
      'Entrega priorizada na reta final',
    ],
    cta: 'Quero 2 correções — R$ 29,90',
    href: '/planos#correcao',
    badge: null,
  },
  {
    id: 'intensivo',
    titulo: 'Curso Intensivo ENEM — até a data da prova',
    datas: 'Início: 03/10/2025 • ENEM: 09/11/2025',
    preco: 'R$ 199,90 em até 6x',
    bullets: [
      'Aulas de revisão diárias (mín. 40h/semana)',
      'Disciplinas: Matemática, Física, Biologia, Química, Português, Redação, História, Geografia, Filosofia/Sociologia',
      'Correção semanal de redação',
      '1 mentoria particular por semana com os professores',
      'Material completo de revisão incluso',
    ],
    cta: 'Matricular no Intensivo — R$ 199,90',
    href: '/planos#curso-intensivo',
    badge: 'Recomendado',
  },
  {
    id: 'material',
    titulo: 'Material de Revisão Completo',
    preco: 'de R$ 249,90 por R$ 99,90 em até 6x',
    bullets: [
      'Resumos organizados por tema',
      'Mapas mentais prontos para memorização',
      'Listas de exercícios direcionados',
      'Simulados focados no que mais cai no ENEM',
    ],
    cta: 'Quero o material — R$ 99,90',
    href: '/planos#material',
    badge: null,
  },
];

export const PlanosSection = () => {
  const handlePlanoCTA = (planoId: string) => {
    trackEvent('plans_cta_click', { label: planoId });
    window.location.href = '/leads';
  };

  return (
    <section className="bg-[var(--gradient-section)] py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-muted-foreground md:text-4xl">
            Escolha seu plano
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Opções personalizadas para sua jornada rumo à aprovação
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {planos.map(plano => (
            <Card
              key={plano.id}
              className={`relative rounded-xl border border-border/50 bg-card shadow-lg transition-shadow duration-300 hover:shadow-xl ${
                plano.badge ? 'ring-2 ring-primary' : ''
              }`}
            >
              {plano.badge && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                  {plano.badge}
                </Badge>
              )}

              <CardHeader className="pb-4 text-center">
                <h3 className="mb-2 text-xl font-bold text-muted-foreground">{plano.titulo}</h3>
                {plano.datas && <p className="mb-2 text-sm text-muted-foreground">{plano.datas}</p>}
                <div className="text-2xl font-bold text-muted-foreground">{plano.preco}</div>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plano.bullets.map((bullet, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="mt-0.5 size-5 shrink-0 text-success" />
                      <span className="text-sm text-foreground">{bullet}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePlanoCTA(plano.id)}
                  className="mt-6 w-full bg-primary hover:bg-primary/90"
                  size="lg"
                >
                  {plano.cta}
                </Button>

                <div className="flex items-center justify-center space-x-2 pt-2 text-xs text-muted-foreground">
                  <Shield className="size-4" />
                  <span>Garantia 7 dias — cancelamento com devolução integral</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Ofertas Secundárias */}
        <div className="mt-16 rounded-xl bg-muted/30 p-8 text-center">
          <h3 className="mb-6 text-2xl font-bold text-foreground">
            Você também pode estudar conosco de outras formas
          </h3>
          <div className="mx-auto grid max-w-2xl gap-6 md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-semibold text-foreground">Aulas particulares</h4>
              <p className="mb-4 text-muted-foreground">A partir de R$ 49,90/hora</p>
            </div>
            <div>
              <h4 className="mb-2 font-semibold text-foreground">Planos customizados</h4>
              <p className="mb-4 text-muted-foreground">Monte seu pacote sob medida</p>
            </div>
          </div>
          <Button
            onClick={() => {
              trackEvent('whatsapp_click', { label: 'ofertas_secundarias' });
              const message = encodeURIComponent(
                'Oi! Quero saber mais sobre aulas particulares ou planos customizados. Vim pelo site GS Aprova.'
              );
              window.open(`https://wa.me/5511974969036?text=${message}`, '_blank');
            }}
            variant="outline"
            size="lg"
          >
            Falar no WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
};
