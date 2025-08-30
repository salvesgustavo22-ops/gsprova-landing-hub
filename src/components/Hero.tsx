import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SecurityIndicators } from "@/components/SecurityIndicators";
import { trackWhatsAppClick, trackPageSection, trackSecurityIndicatorView } from "@/lib/analytics";
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
    <section className="relative min-h-screen overflow-hidden text-white">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/lovable-uploads/3e196025-f642-4155-ba69-da7ca6ee1d2c.png')` }}
      />
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-primary/20"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 sm:py-12 lg:py-28 min-h-screen flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
            {/* Logo positioned at the top */}
            <div className="mb-4 sm:mb-6 flex justify-center lg:justify-start">
              <img 
                src="/lovable-uploads/81baf984-0517-4524-96a3-e84ec5d2c55d.png" 
                alt="GS Aprova - Aulas de Matemática e Redação para ENEM e Fuvest" 
                className="w-24 sm:w-32 h-auto object-contain drop-shadow-lg"
                width="128"
                height="64"
                loading="eager"
              />
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-white px-2 sm:px-0">
                {heroData.headline}
              </h1>
              
              <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-lg mx-auto lg:mx-0 px-2 sm:px-0">
                {heroData.subheadline}
              </p>
            </div>

            <div className="flex flex-col items-center lg:items-start gap-4 pt-2 sm:pt-4">
              <Button 
                onClick={() => {
                  trackWhatsAppClick('hero_main_cta', 'contato');
                  window.location.href = '/contato';
                }}
                className="w-full sm:w-auto btn-hero text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-6 text-primary bg-accent hover:bg-accent/90 font-bold shadow-lg rounded-xl"
              >
                {heroData.cta}
              </Button>
            </div>
            
            {/* Security Indicators - Hidden on mobile, shown on larger screens */}
            <div className="mt-4 sm:mt-6 hidden sm:block">
              <SecurityIndicators />
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative order-first lg:order-last">
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl mx-4 sm:mx-0">
              <img 
                src={heroImage} 
                alt="Estudante jovem de 18 anos estudando para ENEM e vestibulares com material de matemática e redação"
                className="w-full h-[280px] sm:h-[350px] lg:h-[400px] xl:h-[500px] object-cover"
                fetchPriority="high"
                sizes="(max-width: 640px) 90vw, (max-width: 1023px) 80vw, 45vw"
                width="889"
                height="500"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating Stats - Responsive */}
            <div className="absolute -bottom-4 sm:-bottom-6 left-2 sm:left-6 right-2 sm:right-6 grid grid-cols-3 gap-2 sm:gap-4">
              <div className="bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-4 text-center shadow-lg">
                <div className="text-lg sm:text-2xl font-bold text-primary">900+</div>
                <div className="text-xs text-muted-foreground">Nota Redação</div>
              </div>
              <div className="bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-4 text-center shadow-lg">
                <div className="text-lg sm:text-2xl font-bold text-accent">R$ 70</div>
                <div className="text-xs text-muted-foreground">A partir de</div>
              </div>
              <div className="bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-4 text-center shadow-lg">
                <div className="text-lg sm:text-2xl font-bold text-primary">Hoje</div>
                <div className="text-xs text-muted-foreground">Começa</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Security Indicators for mobile - at bottom */}
        <div className="absolute bottom-4 left-4 right-4 sm:hidden">
          <SecurityIndicators />
        </div>
      </div>
    </section>
  );
};