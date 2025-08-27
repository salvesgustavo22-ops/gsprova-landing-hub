import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trackWhatsAppClick } from "@/lib/analytics";
import heroImage from "@/assets/hero-student-18yo.jpg";

interface HeroVariant {
  id: string;
  headline: string;
  subheadline: string;
  cta: string;
  badge: string;
}

const heroData = {
  headline: "Estude certo para o ENEM e Fuvest: foco no que realmente garante pontos",
  subheadline: "Nada de estudar tudo e se perder. Com o GS Aprova você tem Matemática prática, correção de redação detalhada e uma trilha de estudo personalizada.",
  cta: "Quero começar agora"
};

export const Hero = () => {
  const handleCTAClick = () => {
    trackWhatsAppClick('Hero CTA', 'new_version');
    
    const message = encodeURIComponent("Oi, quero começar agora meus estudos. Vim pelo site GS Aprova.");
    window.open(`https://wa.me/5511974969036?text=${message}`, '_blank');
  };

  return (
    <section className="relative overflow-hidden bg-primary text-white">
      <div className="container mx-auto px-4 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            {/* Logo positioned at the left top */}
            <div className="mb-6 relative z-10">
              <img 
                src="/lovable-uploads/81baf984-0517-4524-96a3-e84ec5d2c55d.png" 
                alt="GS Aprova Logo" 
                className="w-32 h-auto object-contain drop-shadow-lg"
              />
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-white">
                {heroData.headline}
              </h1>
              
              <p className="text-lg text-white/90 leading-relaxed max-w-lg">
                {heroData.subheadline}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => window.location.href = '/contato'}
                className="btn-hero text-lg px-10 py-6 text-primary bg-accent hover:bg-accent/90 font-bold"
              >
                {heroData.cta}
              </Button>
              
              <div className="flex items-center space-x-4 text-sm text-white/70">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Online ou Presencial</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Pagamento Fácil</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage} 
                alt="Estudante brasileiro preparando-se para ENEM com confiança"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 left-6 right-6 grid grid-cols-3 gap-4">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
                <div className="text-2xl font-bold text-primary">900+</div>
                <div className="text-xs text-muted-foreground">Nota Redação</div>
              </div>
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
                <div className="text-2xl font-bold text-accent">R$ 70</div>
                <div className="text-xs text-muted-foreground">A partir de</div>
              </div>
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
                <div className="text-2xl font-bold text-primary">Hoje</div>
                <div className="text-xs text-muted-foreground">Começa</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};