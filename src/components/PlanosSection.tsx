import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Shield } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const planos = [
  {
    id: "correcao",
    titulo: "Pacote de 2 correções de redação",
    preco: "R$ 29,90 em até 6x",
    bullets: [
      "2 correções com devolutiva objetiva pelos critérios do ENEM",
      "Recomendações práticas para ganhar pontos",
      "Entrega priorizada na reta final"
    ],
    cta: "Quero as 2 correções — R$ 29,90",
    href: "/planos#correcao",
    badge: null
  },
  {
    id: "intensivo",
    titulo: "Curso Intensivo ENEM — até a data da prova",
    datas: "Início: 03/10/2025 • ENEM: 09/11/2025",
    preco: "R$ 199,90 em até 6x",
    bullets: [
      "Aulas de revisão diárias (mín. 40h/semana)",
      "Disciplinas: Matemática, Física, Biologia, Química, Português, Redação, História, Geografia, Filosofia/Sociologia",
      "Correção semanal de redação",
      "1 mentoria particular por semana com os professores",
      "Material completo de revisão incluso"
    ],
    cta: "Matricular no Intensivo — R$ 199,90",
    href: "/planos#curso-intensivo",
    badge: "Mais recomendado"
  },
  {
    id: "material",
    titulo: "Material de Revisão Completo",
    preco: "de R$ 249,90 por R$ 99,90 em até 6x",
    bullets: [
      "Resumos organizados por tema",
      "Mapas mentais prontos para memorização",
      "Listas de exercícios direcionados",
      "Simulados focados no que mais cai no ENEM"
    ],
    cta: "Quero o material — R$ 99,90",
    href: "/planos#material",
    badge: null
  }
];

export const PlanosSection = () => {
  const handlePlanoCTA = (planoId: string) => {
    trackEvent('plans_cta_click', { label: planoId });
    const plano = planos.find(p => p.id === planoId);
    if (plano) {
      window.location.href = plano.href;
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Escolha seu plano
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Opções personalizadas para sua jornada rumo à aprovação
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {planos.map((plano) => (
            <Card 
              key={plano.id}
              className={`relative bg-card shadow-lg rounded-xl border border-border/50 hover:shadow-xl transition-shadow duration-300 ${
                plano.badge ? 'ring-2 ring-primary' : ''
              }`}
            >
              {plano.badge && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                  {plano.badge}
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {plano.titulo}
                </h3>
                {plano.datas && (
                  <p className="text-sm text-muted-foreground mb-2">
                    {plano.datas}
                  </p>
                )}
                <div className="text-2xl font-bold text-primary">
                  {plano.preco}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plano.bullets.map((bullet, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{bullet}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePlanoCTA(plano.id)}
                  className="w-full bg-primary hover:bg-primary/90 mt-6"
                  size="lg"
                >
                  {plano.cta}
                </Button>

                <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground pt-2">
                  <Shield className="w-4 h-4" />
                  <span>Garantia 7 dias — cancelamento com devolução integral</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Ofertas Secundárias */}
        <div className="mt-16 text-center bg-muted/30 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-foreground mb-6">
            Ofertas Secundárias
          </h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div>
              <h4 className="font-semibold text-foreground mb-2">
                Aulas particulares
              </h4>
              <p className="text-muted-foreground mb-4">
                A partir de R$ 49,90/hora
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">
                Planos customizados
              </h4>
              <p className="text-muted-foreground mb-4">
                Monte seu pacote sob medida
              </p>
            </div>
          </div>
          <Button
            onClick={() => {
              trackEvent('whatsapp_click', { label: 'ofertas_secundarias' });
              const message = encodeURIComponent("Oi! Quero saber mais sobre aulas particulares ou planos customizados. Vim pelo site GS Aprova.");
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