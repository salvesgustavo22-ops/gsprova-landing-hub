import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CheckCircle, MessageCircle, Calculator, PenTool, Route, Layers, ArrowRight } from "lucide-react";
import { trackConversion, trackWhatsAppClick } from "@/lib/analytics";

export default function ObrigadoServicos() {
  const [selectedService, setSelectedService] = useState<string>("");

  const serviceDetails = {
    "matematica-online": {
      name: "Matemática Online",
      icon: Calculator,
      description: "Aulas focadas nos tópicos que mais caem no ENEM e Fuvest",
      features: [
        "Lista completa dos tópicos que mais caem",
        "Videoaulas explicativas passo a passo",
        "Exercícios resolvidos estilo ENEM/Fuvest",
        "Revisão personalizada dos seus erros",
        "Plano de evolução semanal",
        "Suporte direto via WhatsApp"
      ],
      price: "A partir de R$ 70/aula",
      nextStep: "Ver detalhes das aulas de matemática"
    },
    "correcao-redacao": {
      name: "Correção de Redação",
      icon: PenTool,
      description: "Correção personalizada linha a linha com critérios oficiais",
      features: [
        "Correção detalhada por parágrafo",
        "Comentários específicos em cada linha",
        "Orientação para melhorar a tese",
        "Sugestões de reescrita e melhoria",
        "Avaliação pelos critérios oficiais",
        "Feedback via WhatsApp"
      ],
      price: "A partir de R$ 45/redação",
      nextStep: "Ver detalhes da correção de redação"
    },
    "trilha-personalizada": {
      name: "Trilha Personalizada",
      icon: Route,
      description: "Cronograma de estudos adaptado ao seu perfil e objetivos",
      features: [
        "Diagnóstico completo do seu nível",
        "Cronograma personalizado por semana",
        "Ajustes baseados no seu progresso",
        "Lembretes e metas semanais",
        "Acompanhamento contínuo",
        "Orientação via WhatsApp"
      ],
      price: "A partir de R$ 120/mês",
      nextStep: "Montar minha trilha personalizada"
    },
    "plano-completo": {
      name: "Plano Completo",
      icon: Layers,
      description: "Matemática + Redação + Trilha com acompanhamento integral",
      features: [
        "Tudo dos planos anteriores incluído",
        "Acompanhamento integral e integrado",
        "Prioridade no atendimento",
        "Relatórios semanais de progresso",
        "Ajustes em tempo real",
        "Suporte premium no WhatsApp"
      ],
      price: "A partir de R$ 200/mês",
      nextStep: "Conhecer o plano completo"
    }
  };

  useEffect(() => {
    document.title = "Informações do Seu Serviço | GS Aprova";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Conheça os detalhes do serviço escolhido e fale com nossa equipe para começar sua preparação personalizada.");
    }

    // Get service from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const service = urlParams.get('service');
    if (service && serviceDetails[service as keyof typeof serviceDetails]) {
      setSelectedService(service);
    }

    // Track conversion
    trackConversion('service_interest', 0, 'BRL');
  }, []);

  const handleWhatsAppClick = () => {
    const service = serviceDetails[selectedService as keyof typeof serviceDetails];
    trackWhatsAppClick('thank_you_services', selectedService);
    
    const message = encodeURIComponent(
      `Oi! Acabei de me interessar pelo serviço "${service?.name}" e quero saber mais detalhes sobre preços e como começar.`
    );
    window.open(`https://wa.me/5511974969036?text=${message}`, '_blank');
  };

  if (!selectedService || !serviceDetails[selectedService as keyof typeof serviceDetails]) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="py-16 lg:py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Serviço não encontrado</h1>
            <p className="text-muted-foreground mb-8">
              Volte para a página de serviços e selecione uma opção válida.
            </p>
            <Button onClick={() => window.location.href = '/lead-servicos'}>
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
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Success Message */}
            <div className="text-center mb-12">
              <div className="bg-green-100 dark:bg-green-900/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-green-600 dark:text-green-400" size={40} />
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                Perfeito! Recebemos seu interesse
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8">
                Aqui estão todos os detalhes sobre o <strong>{service.name}</strong> que você escolheu.
              </p>
            </div>

            {/* Service Details */}
            <Card className="mb-12 border-2 border-primary/20">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Icon className="text-primary" size={36} />
                  <CardTitle className="text-2xl">{service.name}</CardTitle>
                </div>
                <p className="text-muted-foreground text-lg">
                  {service.description}
                </p>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  
                  {/* Features */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">O que está incluído:</h3>
                    <ul className="space-y-3">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="mr-3 mt-0.5 text-primary flex-shrink-0" size={18} />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing and CTA */}
                  <div>
                    <div className="bg-primary/10 p-6 rounded-lg text-center">
                      <h3 className="text-xl font-semibold mb-2">Investimento</h3>
                      <p className="text-3xl font-bold text-primary mb-4">{service.price}</p>
                      <p className="text-sm text-muted-foreground mb-6">
                        Condições especiais disponíveis. Fale conosco!
                      </p>
                      
                      <Button
                        onClick={handleWhatsAppClick}
                        className="btn-hero bg-primary hover:bg-primary/90 text-white py-4 px-8 w-full"
                      >
                        <MessageCircle className="mr-2" size={20} />
                        {service.nextStep}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="text-center">Como funciona o próximo passo?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-primary font-bold">1</span>
                    </div>
                    <h4 className="font-semibold mb-2">Fale conosco</h4>
                    <p className="text-sm text-muted-foreground">
                      Clique no botão acima para conversar via WhatsApp
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-primary font-bold">2</span>
                    </div>
                    <h4 className="font-semibold mb-2">Tire suas dúvidas</h4>
                    <p className="text-sm text-muted-foreground">
                      Nossa equipe vai esclarecer todos os detalhes
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-primary font-bold">3</span>
                    </div>
                    <h4 className="font-semibold mb-2">Comece hoje</h4>
                    <p className="text-sm text-muted-foreground">
                      Inicie sua preparação direcionada imediatamente
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Final CTA */}
            <Card className="bg-gradient-to-br from-primary to-primary/90 text-white">
              <CardContent className="text-center py-12">
                <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                  Pronto para começar?
                </h2>
                
                <p className="text-white/90 mb-6 text-lg">
                  Nossa equipe está online agora e pronta para tirar todas as suas dúvidas sobre o {service.name}.
                </p>

                <Button
                  onClick={handleWhatsAppClick}
                  className="btn-hero bg-accent hover:bg-accent/90 text-primary py-6 px-10 text-lg"
                >
                  <MessageCircle className="mr-2" size={20} />
                  Falar Agora no WhatsApp
                  <ArrowRight className="ml-2" size={20} />
                </Button>
                
                <p className="text-white/70 text-sm mt-4">
                  ⚡ Resposta imediata • 💬 Atendimento personalizado • 🎯 Orientação gratuita
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}