import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckIcon, StarIcon } from "lucide-react";
import { trackPlanClick } from "@/lib/analytics";

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  features: string[];
  badge?: string;
  popular?: boolean;
  category: 'math' | 'essay';
}

const services: Service[] = [
  {
    id: 'math-single',
    title: 'Matemática - Aula Avulsa',
    description: 'Aula individual focada nas suas dificuldades específicas',
    price: 'R$ 70',
    features: [
      '1 hora de aula personalizada',
      'Material de apoio incluso',
      'Exercícios direcionados',
      'Online ou presencial (SP)'
    ],
    category: 'math'
  },
  {
    id: 'math-package',
    title: 'Matemática - Pacote 4 Aulas',
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
    ],
    category: 'math'
  },
  {
    id: 'essay-single',
    title: 'Redação - Correção Avulsa',
    description: 'Correção detalhada com feedback personalizado',
    price: 'R$ 70',
    features: [
      '1 redação corrigida',
      'Feedback escrito detalhado',
      'Dicas de melhoria',
      'Nota estimada ENEM'
    ],
    category: 'essay'
  },
  {
    id: 'essay-package',
    title: 'Redação - Pacote Completo',
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
    ],
    category: 'essay'
  }
];

export const Services = () => {
  const handlePlanClick = (service: Service) => {
    trackPlanClick(service.title);
    
    const message = encodeURIComponent(`Oi, tenho interesse no plano "${service.title}" por ${service.price}. Vim pelo site GS Aprova.`);
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
  };

  return (
    <section id="servicos" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Cardápio de Serviços
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Escolha o plano ideal para sua preparação. Aulas de Matemática e correções de Redação com metodologia comprovada.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service) => (
            <Card 
              key={service.id} 
              className={`card-service relative ${service.popular ? 'ring-2 ring-primary' : ''}`}
            >
              {service.badge && (
                <Badge 
                  className={`absolute -top-3 left-1/2 -translate-x-1/2 ${
                    service.popular ? 'bg-primary text-primary-foreground' : 'badge-success'
                  }`}
                >
                  {service.badge}
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="mb-2">
                  <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${
                    service.category === 'math' ? 'bg-primary/10' : 'bg-success/10'
                  }`}>
                    {service.category === 'math' ? '📊' : '✍️'}
                  </div>
                </div>
                
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
                  onClick={() => handlePlanClick(service)}
                  className={`w-full ${
                    service.popular 
                      ? 'btn-hero' 
                      : 'bg-primary hover:bg-primary-hover text-primary-foreground'
                  }`}
                >
                  Quero este plano
                  {service.popular && <StarIcon className="w-4 h-4 ml-2" />}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-background rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-6 text-center">Comparação Rápida</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Serviço</th>
                  <th className="text-center py-3">Avulso</th>
                  <th className="text-center py-3">Pacote</th>
                  <th className="text-center py-3">Economia</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 font-medium">Matemática</td>
                  <td className="text-center py-3">R$ 70/aula</td>
                  <td className="text-center py-3 text-success font-semibold">R$ 62,50/aula</td>
                  <td className="text-center py-3 text-success">R$ 30</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">Redação</td>
                  <td className="text-center py-3">R$ 70/correção</td>
                  <td className="text-center py-3 text-success font-semibold">R$ 50/correção</td>
                  <td className="text-center py-3 text-success">R$ 70</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};