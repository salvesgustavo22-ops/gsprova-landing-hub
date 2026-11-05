import { useEffect, useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import {
  CheckCircle,
  MessageCircle,
  Calculator,
  PenTool,
  Route,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { trackConversion, trackWhatsAppClick } from '@/lib/analytics';

export default function ObrigadoServicos() {
  const [selectedService, setSelectedService] = useState<string>('');

  const serviceDetails = useMemo(
    () => ({
      'matematica-online': {
        name: 'Matemática Online',
        icon: Calculator,
        description: 'Aulas focadas nos tópicos que mais caem no ENEM e Fuvest',
        features: [
          'Lista completa dos tópicos que mais caem',
          'Videoaulas explicativas passo a passo',
          'Exercícios resolvidos estilo ENEM/Fuvest',
          'Revisão personalizada dos seus erros',
          'Plano de evolução semanal',
          'Suporte direto via WhatsApp',
        ],
        price: 'A partir de R$ 70/aula',
        nextStep: 'Ver detalhes das aulas de matemática',
      },
      'correcao-redacao': {
        name: 'Correção de Redação',
        icon: PenTool,
        description: 'Correção personalizada linha a linha com critérios oficiais',
        features: [
          'Correção detalhada por parágrafo',
          'Comentários específicos em cada linha',
          'Orientação para melhorar a tese',
          'Sugestões de reescrita e melhoria',
          'Avaliação pelos critérios oficiais',
          'Feedback via WhatsApp',
        ],
        price: 'A partir de R$ 45/redação',
        nextStep: 'Ver detalhes da correção de redação',
      },
      'trilha-personalizada': {
        name: 'Trilha Personalizada',
        icon: Route,
        description: 'Cronograma de estudos adaptado ao seu perfil e objetivos',
        features: [
          'Diagnóstico completo do seu nível',
          'Cronograma personalizado por semana',
          'Ajustes baseados no seu progresso',
          'Lembretes e metas semanais',
          'Acompanhamento contínuo',
          'Orientação via WhatsApp',
        ],
        price: 'A partir de R$ 120/mês',
        nextStep: 'Montar minha trilha personalizada',
      },
      'plano-completo': {
        name: 'Plano Completo',
        icon: Layers,
        description: 'Matemática + Redação + Trilha com acompanhamento integral',
        features: [
          'Tudo dos planos anteriores incluído',
          'Acompanhamento integral e integrado',
          'Prioridade no atendimento',
          'Relatórios semanais de progresso',
          'Ajustes em tempo real',
          'Suporte premium no WhatsApp',
        ],
        price: 'A partir de R$ 200/mês',
        nextStep: 'Conhecer o plano completo',
      },
    }),
    []
  );

  useEffect(() => {
    document.title = 'Informações do Seu Serviço | GS Aprova';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Conheça os detalhes do serviço escolhido e fale com nossa equipe para começar sua preparação personalizada.'
      );
    }

    // Get service from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const service = urlParams.get('service');
    if (service && serviceDetails[service as keyof typeof serviceDetails]) {
      setSelectedService(service);
    }

    // Track conversion
    trackConversion('service_interest', 0, 'BRL');
  }, [serviceDetails]);

  const handleWhatsAppClick = () => {
    const service = serviceDetails[selectedService as keyof typeof serviceDetails];
    trackWhatsAppClick('thank_you_services', selectedService);

    const message = encodeURIComponent(
      `Oi! Acabei de me interessar pelo serviço "${service?.name}" e quero saber mais detalhes sobre preços e como começar.`
    );
    window.open(`https://wa.me/5511985363890?text=${message}`, '_blank');
  };

  if (!selectedService || !serviceDetails[selectedService as keyof typeof serviceDetails]) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="py-16 lg:py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-4 text-2xl font-bold">Serviço não encontrado</h1>
            <p className="mb-8 text-muted-foreground">
              Volte para a página de serviços e selecione uma opção válida.
            </p>
            <Button onClick={() => (window.location.href = '/lead-servicos')}>
              Voltar para Serviços
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const service = serviceDetails[selectedService as keyof typeof serviceDetails];
  const Icon = service.icon;

  return (
    <div className="section-modern min-h-screen">
      <div className="section-content">
        <Navigation />

        <main className="py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              {/* Success Message */}
              <div className="mb-12 text-center">
                <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-accent/20">
                  <CheckCircle className="text-accent" size={40} />
                </div>

                <h1 className="mb-4 text-3xl font-bold text-white lg:text-4xl">
                  Perfeito! Recebemos seu interesse
                </h1>

                <p className="mb-8 text-lg font-light text-white/85">
                  Aqui estão todos os detalhes sobre o <strong>{service.name}</strong> que você
                  escolheu.
                </p>
              </div>

              {/* Service Details */}
              <div className="card-navy mb-12 rounded-xl border-2 border-accent/30 p-8">
                <div className="mb-8 text-center">
                  <div className="mb-4 flex items-center justify-center gap-3">
                    <Icon className="text-accent" size={36} />
                    <h2 className="text-2xl font-bold text-white">{service.name}</h2>
                  </div>
                  <p className="text-lg font-light text-white/80">{service.description}</p>
                </div>

                <div className="text-center">
                  <Button onClick={handleWhatsAppClick} className="btn-yellow px-8 py-6 text-lg">
                    <MessageCircle className="mr-2" size={20} />
                    {service.nextStep}
                  </Button>
                </div>
              </div>

              {/* Final CTA */}
              <div className="card-navy rounded-xl p-12 text-center">
                <h2 className="mb-4 text-2xl font-bold text-white lg:text-3xl">
                  Pronto para começar?
                </h2>

                <p className="mb-6 text-lg font-light text-white/85">
                  Nossa equipe está online agora e pronta para tirar todas as suas dúvidas sobre o{' '}
                  {service.name}.
                </p>

                <Button onClick={handleWhatsAppClick} className="btn-yellow px-10 py-6 text-lg">
                  <MessageCircle className="mr-2" size={20} />
                  Falar Agora no WhatsApp
                  <ArrowRight className="ml-2" size={20} />
                </Button>

                <p className="mt-4 text-sm font-light text-white/70">
                  ⚡ Resposta imediata • 💬 Atendimento personalizado • 🎯 Orientação gratuita
                </p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
