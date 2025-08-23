import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckIcon, StarIcon } from "lucide-react";
import { trackPlanClick } from "@/lib/analytics";

interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  features: string[];
  badge?: string;
  popular?: boolean;
}

const mathServices: ServiceDetail[] = [
  {
    id: 'math-single',
    title: 'Aula Avulsa',
    description: 'Aula individual focada nas suas dificuldades específicas',
    price: 'R$ 70',
    features: [
      '1 hora de aula personalizada',
      'Material de apoio incluso',
      'Exercícios direcionados',
      'Online ou presencial (SP)'
    ]
  },
  {
    id: 'math-package',
    title: 'Pacote 4 Aulas',
    description: 'Plano completo com acompanhamento contínuo',
    price: 'R$ 250',
    originalPrice: 'R$ 280',
    badge: 'Economia R$ 30',
    features: [
      '4 aulas de 1 hora cada',
      'Plano de estudos personalizado',
      'Lista de exercícios exclusiva',
      'Suporte via WhatsApp',
      'Simulados práticos'
    ]
  }
];

const essayServices: ServiceDetail[] = [
  {
    id: 'essay-single',
    title: 'Correção Avulsa',
    description: 'Correção detalhada com feedback personalizado',
    price: 'R$ 70',
    features: [
      '1 redação corrigida',
      'Feedback escrito detalhado',
      'Dicas de melhoria',
      'Nota estimada ENEM'
    ]
  },
  {
    id: 'essay-package',
    title: 'Pacote Completo',
    description: 'Plano premium com acompanhamento total',
    price: 'R$ 350',
    originalPrice: 'R$ 420',
    badge: 'Mais Vendido',
    popular: true,
    features: [
      '5 correções de redação',
      '2 horas de orientação online',
      'Banco de temas atualizados',
      'Correção em 24h',
      'Acompanhamento até o ENEM'
    ]
  }
];

export const Services = () => {
  const [activeService, setActiveService] = useState<'math' | 'essay' | null>(null);

  const handlePlanClick = (service: ServiceDetail, category: string) => {
    trackPlanClick(`${category} - ${service.title}`);
    
    const message = encodeURIComponent(`Oi, tenho interesse no plano "${category} - ${service.title}" por ${service.price}. Vim pelo site GS Aprova.`);
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
  };

  const handleServiceClick = (service: 'math' | 'essay') => {
    setActiveService(activeService === service ? null : service);
  };

  return (
    <section id="servicos" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Nossos Serviços
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Clique em cada área para ver as modalidades disponíveis com preços e detalhes.
          </p>
        </div>

        {/* Service Selection Bands */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div 
            onClick={() => handleServiceClick('math')}
            className={`cursor-pointer card-service hover:scale-105 transition-all ${
              activeService === 'math' ? 'ring-2 ring-primary bg-primary/5' : ''
            }`}
          >
            <Card className="border-none bg-transparent">
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-2xl font-bold mb-2 text-foreground">
                  Aula e Reforço de Matemática
                </h3>
                <p className="text-muted-foreground">
                  Matemática descomplicada para ENEM e vestibulares
                </p>
                <div className="mt-4 text-primary font-semibold">
                  Clique para ver modalidades
                </div>
              </CardContent>
            </Card>
          </div>

          <div 
            onClick={() => handleServiceClick('essay')}
            className={`cursor-pointer card-service hover:scale-105 transition-all ${
              activeService === 'essay' ? 'ring-2 ring-primary bg-primary/5' : ''
            }`}
          >
            <Card className="border-none bg-transparent">
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-4">✍️</div>
                <h3 className="text-2xl font-bold mb-2 text-foreground">
                  Redação
                </h3>
                <p className="text-muted-foreground">
                  Correção detalhada para nota 900+ no ENEM
                </p>
                <div className="mt-4 text-primary font-semibold">
                  Clique para ver modalidades
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Service Details */}
        {activeService && (
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {(activeService === 'math' ? mathServices : essayServices).map((service) => (
              <Card 
                key={service.id} 
                className={`card-service relative ${service.popular ? 'ring-2 ring-success' : ''}`}
              >
                {service.badge && (
                  <Badge 
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 ${
                      service.popular ? 'bg-success text-success-foreground' : 'badge-success'
                    }`}
                  >
                    {service.badge}
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                  
                  <div className="mt-4">
                    <div className="flex items-center justify-center gap-2">
                      {service.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {service.originalPrice}
                        </span>
                      )}
                      <span className="text-3xl font-bold text-primary">
                        {service.price}
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckIcon className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    onClick={() => handlePlanClick(service, activeService === 'math' ? 'Matemática' : 'Redação')}
                    className={`w-full ${
                      service.popular 
                        ? 'btn-hero' 
                        : 'bg-primary hover:bg-primary-hover text-primary-foreground'
                    }`}
                  >
                    Quero este
                    {service.popular && <StarIcon className="w-4 h-4 ml-2" />}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};