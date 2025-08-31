import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SecurityIndicators } from "@/components/SecurityIndicators";
import { trackWhatsAppClick, trackPageSection, trackSecurityIndicatorView } from "@/lib/analytics";
import { Calculator, BookOpen, Target, Zap, TrendingUp, Award } from 'lucide-react';
import heroImage from "@/assets/hero-student-18yo.jpg";
import heroBgImage from "@/assets/hero-modern-bg.jpg";

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
    <section className="hero-modern relative">
      {/* Modern Background with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${heroBgImage})` }}
      />
      
      {/* Floating Elements */}
      <div className="floating-element top-20 left-10 text-white/30 hidden lg:block">
        <Calculator size={40} />
      </div>
      <div className="floating-element top-32 right-16 text-white/30 hidden lg:block" style={{animationDelay: '1s'}}>
        <BookOpen size={35} />
      </div>
      <div className="floating-element bottom-40 left-20 text-white/30 hidden lg:block" style={{animationDelay: '2s'}}>
        <Target size={30} />
      </div>
      <div className="floating-element top-48 right-32 text-white/30 hidden lg:block" style={{animationDelay: '3s'}}>
        <Zap size={45} />
      </div>
      <div className="floating-element bottom-32 right-10 text-white/30 hidden lg:block" style={{animationDelay: '4s'}}>
        <TrendingUp size={38} />
      </div>
      
      <div className="hero-content container mx-auto px-4 py-8 sm:py-12 lg:py-28 min-h-screen flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Logo positioned at the top */}
            <div className="mb-6 sm:mb-8 flex justify-center lg:justify-start">
              <img 
                src="/lovable-uploads/81baf984-0517-4524-96a3-e84ec5d2c55d.png" 
                alt="GS Aprova - Aulas de Matemática e Redação para ENEM e Fuvest" 
                className="w-28 sm:w-36 h-auto object-contain drop-shadow-2xl"
                width="144"
                height="72"
                loading="eager"
              />
            </div>
            
            <div className="space-y-6 sm:space-y-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white px-2 sm:px-0 tracking-tight">
                {heroData.headline}
              </h1>
              
              <p className="text-lg sm:text-xl lg:text-2xl text-white/95 leading-relaxed max-w-2xl mx-auto lg:mx-0 px-2 sm:px-0 font-medium">
                {heroData.subheadline}
              </p>
              
              {/* Enhanced Bullets - Distinct from buttons */}
              <div className="flex flex-col space-y-4 text-left max-w-xl mx-auto lg:mx-0">
                {heroData.bullets.map((bullet, index) => (
                  <div key={index} className="convenience-box flex items-center space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-white/20 to-white/30 rounded-full flex items-center justify-center border border-white/20">
                      <span className="text-white text-sm">{bullet.icon}</span>
                    </div>
                    <span className="text-white/95 font-medium text-base">{bullet.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 sm:gap-6 pt-4 sm:pt-6">
              <Button 
                onClick={() => {
                  trackWhatsAppClick('hero_main_cta', 'whatsapp_direct');
                  const message = encodeURIComponent("Oi, quero começar agora meus estudos para ENEM/Fuvest 2025. Vim pelo site GS Aprova.");
                  window.open(`https://wa.me/5511974969036?text=${message}`, '_blank');
                }}
                className="w-full sm:w-auto btn-hero text-lg px-10 py-6 font-bold"
              >
                Começar agora no WhatsApp
              </Button>
              
              <Button 
                onClick={() => {
                  trackWhatsAppClick('hero_secondary_cta', 'lead_servicos');
                  window.location.href = '/lead-servicos';
                }}
                className="w-full sm:w-auto btn-hero-secondary text-lg px-10 py-6 font-bold"
              >
                Quero escolher meu serviço
              </Button>
              
              <Button 
                onClick={() => {
                  trackWhatsAppClick('hero_tertiary_cta', 'lead_checklist');
                  window.location.href = '/lead-checklist';
                }}
                className="w-full sm:w-auto btn-hero-outline text-lg px-10 py-6 font-bold"
              >
                Baixar checklist ENEM 2025
              </Button>
            </div>
          </div>

          {/* Enhanced Hero Image with Modern Effects */}
          <div className="relative order-first lg:order-last">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mx-4 sm:mx-0 border border-white/20">
              <img 
                src={heroImage} 
                alt="Estudante jovem de 18 anos estudando para ENEM e vestibulares com material de matemática e redação"
                className="w-full h-[320px] sm:h-[400px] lg:h-[450px] xl:h-[550px] object-cover"
                fetchPriority="high"
                sizes="(max-width: 640px) 90vw, (max-width: 1023px) 80vw, 45vw"
                width="889"
                height="550"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            </div>
            
            {/* Enhanced Floating Stats */}
            <div className="absolute -bottom-6 sm:-bottom-8 left-2 sm:left-6 right-2 sm:right-6 grid grid-cols-3 gap-3 sm:gap-6">
              <div className="bg-white/95 backdrop-blur-md rounded-xl p-3 sm:p-6 text-center shadow-2xl border border-white/20 transform hover:scale-105 transition-all duration-300">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">900+</div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium">Nota Redação</div>
              </div>
              <div className="bg-white/95 backdrop-blur-md rounded-xl p-3 sm:p-6 text-center shadow-2xl border border-white/20 transform hover:scale-105 transition-all duration-300">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">R$ 70</div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium">A partir de</div>
              </div>
              <div className="bg-white/95 backdrop-blur-md rounded-xl p-3 sm:p-6 text-center shadow-2xl border border-white/20 transform hover:scale-105 transition-all duration-300">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Hoje</div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium">Começa</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};