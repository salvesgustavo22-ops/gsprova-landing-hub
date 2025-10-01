import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { StickyWhatsApp } from "@/components/StickyWhatsApp";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Shield } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useEffect } from "react";

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
    badge: null
  },
  {
    id: "curso-intensivo",
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
    badge: null
  }
];

const Planos = () => {
  useEffect(() => {
    // Update page title and meta description
    document.title = "Planos - GS Aprova";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Escolha seu plano: Curso Intensivo ENEM, Correção de Redação ou Material Completo. Garantia 7 dias com devolução integral.');
    }
  }, []);

  const handlePlanoCTA = (planoId: string) => {
    trackEvent('plans_cta_click', { label: planoId, page: 'planos' });
    const message = encodeURIComponent(`Oi! Quero contratar o plano ${planoId}. Vim pelo site GS Aprova.`);
    window.open(`https://wa.me/5511974969036?text=${message}`, '_blank');
  };

  const handleOfertasSecundarias = () => {
    trackEvent('whatsapp_click', { label: 'ofertas_secundarias', page: 'planos' });
    const message = encodeURIComponent("Oi! Quero saber mais sobre aulas particulares ou planos customizados. Vim pelo site GS Aprova.");
    window.open(`https://wa.me/5511974969036?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6]">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Escolha seu plano
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Opções personalizadas para sua jornada rumo à aprovação no ENEM 2025
            </p>
          </div>
        </section>

        {/* Planos Section */}
        <section className="py-16 bg-white dark:bg-[#0F172A]">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {planos.map((plano) => (
                <Card 
                  key={plano.id}
                  id={plano.id}
                  className={`relative bg-white dark:bg-[#1E3A8A] shadow-lg rounded-xl border ${
                    plano.badge ? 'border-[#FBBF24] border-2' : 'border-[#E5E7EB] dark:border-[#FBBF24]/20'
                  } hover:shadow-xl transition-shadow duration-300`}
                >
                  {plano.badge && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#FBBF24] text-[#1E3A8A]">
                      {plano.badge}
                    </Badge>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <h2 className="text-xl font-bold text-[#1E3A8A] dark:text-white mb-2">
                      {plano.titulo}
                    </h2>
                    {plano.datas && (
                      <p className="text-sm text-gray-600 dark:text-white/70 mb-2">
                        {plano.datas}
                      </p>
                    )}
                    <div className="text-2xl font-bold text-[#1E3A8A] dark:text-[#FBBF24]">
                      {plano.preco}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {plano.bullets.map((bullet, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-[#FBBF24] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-[#111827] dark:text-white">{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => handlePlanoCTA(plano.id)}
                      className="w-full bg-[#FBBF24] text-[#1E3A8A] hover:brightness-95 mt-6 font-semibold"
                      size="lg"
                    >
                      {plano.cta}
                    </Button>

                    <div className="flex items-center justify-center space-x-2 text-xs text-gray-600 dark:text-white/70 pt-2">
                      <Shield className="w-4 h-4" />
                      <span>Garantia 7 dias — cancelamento com devolução integral</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Ofertas Secundárias */}
        <section className="py-16 bg-[#F3F4F6] dark:bg-[#0F172A]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-[#1E3A8A] dark:text-white mb-8">
              Ofertas Secundárias
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-8">
              <div>
                <h3 className="text-xl font-semibold text-[#1E3A8A] dark:text-white mb-2">
                  Aulas particulares
                </h3>
                <p className="text-gray-600 dark:text-white/70 mb-4">
                  A partir de R$ 49,90/hora
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#1E3A8A] dark:text-white mb-2">
                  Planos customizados
                </h3>
                <p className="text-gray-600 dark:text-white/70 mb-4">
                  Monte seu pacote sob medida
                </p>
              </div>
            </div>
            <Button
              onClick={handleOfertasSecundarias}
              className="bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/90 px-8"
              size="lg"
            >
              Falar no WhatsApp
            </Button>
            
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-white/70 mt-4">
              <Shield className="w-4 h-4" />
              <span>Garantia 7 dias — cancelamento com devolução integral</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <StickyWhatsApp />
    </div>
  );
};

export default Planos;