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
  headline: "Matemática + Redação para ENEM 2025 e Fuvest 2025",
  subheadline: "Aulas online, correção de redação personalizada e trilha de estudos focada no que mais cai. Simulados e suporte direto no WhatsApp.",
  bullets: [
    { icon: "🎯", text: "Foco no que dá ponto" },
    { icon: "✍️", text: "Correção linha a linha" },
    { icon: "📊", text: "Trilha com metas semanais" }
  ]
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
              
              {/* Bullets */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 py-4">
                {heroData.bullets.map((bullet, index) => (
                  <div key={index} className="flex items-center gap-2 text-white/90">
                    <span className="text-lg">{bullet.icon}</span>
                    <span className="text-sm sm:text-base font-medium">{bullet.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Button 
                onClick={() => {
                  trackWhatsAppClick('hero_main_cta', 'whatsapp_direct');
                  const message = encodeURIComponent("Oi, quero começar agora meus estudos para ENEM/Fuvest 2025. Vim pelo site GS Aprova.");
                  window.open(`https://wa.me/5511974969036?text=${message}`, '_blank');
                }}
                className="w-full sm:w-auto btn-hero text-sm sm:text-base px-6 sm:px-8 py-4 sm:py-5 text-white bg-primary hover:bg-primary/90 font-bold shadow-lg rounded-xl"
              >
                Começar agora no WhatsApp
              </Button>
              
              <Button 
                onClick={() => {
                  trackWhatsAppClick('hero_secondary_cta', 'lead_servicos');
                  window.location.href = '/lead-servicos';
                }}
                className="w-full sm:w-auto btn-hero text-sm sm:text-base px-6 sm:px-8 py-4 sm:py-5 text-primary bg-accent hover:bg-accent/90 font-bold shadow-lg rounded-xl"
              >
                Quero escolher meu serviço
              </Button>
              
              <Button 
                onClick={() => {
                  trackWhatsAppClick('hero_tertiary_cta', 'lead_checklist');
                  window.location.href = '/lead-checklist';
                }}
                className="w-full sm:w-auto btn-hero text-sm sm:text-base px-6 sm:px-8 py-4 sm:py-5 text-white bg-muted-foreground hover:bg-muted-foreground/90 font-bold shadow-lg rounded-xl"
              >
                Baixar checklist ENEM 2025
              </Button>
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
      </div>
    </section>
  );
};