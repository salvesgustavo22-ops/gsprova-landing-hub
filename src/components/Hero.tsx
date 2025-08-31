import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SecurityIndicators } from "@/components/SecurityIndicators";
import { trackWhatsAppClick, trackPageSection, trackSecurityIndicatorView } from "@/lib/analytics";
import { Calculator, BookOpen, Target, Zap, TrendingUp, Award } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import studentWoman from "/lovable-uploads/7cea088c-1e84-4b15-86ab-6a6c2aa3d4ed.png";
import studentMan from "/lovable-uploads/18015f32-572d-4cad-9ba0-16d5315e7060.png";
import studentsGroup from "/lovable-uploads/280cddf7-6e06-4b0d-8568-923aca47f9f4.png";
import heroBgImage from "@/assets/hero-modern-bg.jpg";

interface HeroVariant {
  id: string;
  headline: string;
  subheadline: string;
  cta: string;
  badge: string;
}

const heroData = {
  headline: "Matemática e Redação para Vestibulares, Concursos e Reforço Escolar",
  subheadline: "Aulas online, correção de redação personalizada e trilha de estudos focada no que mais cai. Simulados e suporte direto no WhatsApp.",
  slides: [
    {
      image: studentWoman,
      title: "Foco no que dá ponto",
      description: "Estratégias direcionadas para maximizar\nsua pontuação nos vestibulares"
    },
    {
      image: studentMan,
      title: "Correção linha a linha",
      description: "Feedback detalhado e personalizado\npara aperfeiçoar sua redação"
    },
    {
      image: studentsGroup,
      title: "Trilha com metas semanais",
      description: "Planejamento estruturado com objetivos\nclaros para seu sucesso"
    }
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
      
      <div className="hero-content container mx-auto px-4 py-8 sm:py-12 lg:py-28 min-h-screen flex flex-col justify-center">
        {/* Header Content - Before Carousel */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white px-2 sm:px-0 tracking-tight mb-6">
            {heroData.headline}
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-white/95 leading-relaxed max-w-4xl mx-auto px-2 sm:px-0 font-medium">
            {heroData.subheadline}
          </p>
        </div>

        {/* Hero Carousel - Centered */}
        <div className="max-w-4xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              {heroData.slides.map((slide, index) => (
                <CarouselItem key={index}>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                    <img 
                      src={slide.image} 
                      alt={`${slide.title} - Estudantes preparando-se para ENEM e vestibulares`}
                      className="w-full h-[320px] sm:h-[400px] lg:h-[500px] xl:h-[600px] object-cover"
                      fetchPriority={index === 0 ? "high" : "low"}
                      sizes="(max-width: 640px) 90vw, (max-width: 1023px) 80vw, 80vw"
                      width="889"
                      height="600"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    {/* Text Overlay */}
                    <div className="absolute bottom-6 left-6 text-white max-w-md">
                      <h3 className="text-2xl sm:text-3xl font-bold mb-3 leading-tight">
                        {slide.title}
                      </h3>
                      <p className="text-white/90 text-base sm:text-lg leading-relaxed whitespace-pre-line font-light">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 bg-white/10 border-white/20 text-white hover:bg-white/20" />
            <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 bg-white/10 border-white/20 text-white hover:bg-white/20" />
          </Carousel>
          
          {/* Enhanced Floating Stats - Below Carousel */}
          <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-3 sm:gap-6">
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
          
          {/* Enhanced CTA Buttons - After Carousel */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-8">
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
      </div>
    </section>
  );
};