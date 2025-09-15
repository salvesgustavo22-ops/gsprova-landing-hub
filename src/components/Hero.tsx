import { Button } from "@/components/ui/button";
import { trackWhatsAppClick, trackPageSection } from "@/lib/analytics";
import { Calculator, BookOpen, Target, Zap, TrendingUp, Award } from 'lucide-react';
import heroBgImage from "@/assets/hero-modern-bg.jpg";

export interface HeroProps {
  headline?: string;
  subheadline?: string;
  socialProof?: {
    studentsCount?: number;
    averageScore?: number;
    approvalRate?: number;
  };
  primaryCTA?: {
    text: string;
    action: () => void;
  };
  secondaryCTA?: {
    text: string;
    action: () => void;
  };
}

export const Hero = ({
  headline = "Matemática e Redação para Vestibulares, Concursos e Reforço Escolar",
  subheadline = "Aulas online, correção de redação personalizada e trilha de estudos focada no que mais cai. Simulados e suporte direto no WhatsApp.",
  socialProof = {
    studentsCount: 900,
    averageScore: 70,
    approvalRate: 95
  },
  primaryCTA,
  secondaryCTA
}: HeroProps) => {
  
  const handleWhatsAppClick = () => {
    trackWhatsAppClick('hero_main_cta', 'whatsapp_direct');
    const message = encodeURIComponent("Oi, quero começar agora meus estudos para ENEM/Fuvest 2025. Vim pelo site GS Aprova.");
    window.open(`https://wa.me/5511974969036?text=${message}`, '_blank');
  };

  const handleServicesClick = () => {
    trackPageSection('hero_services_cta', 'navigation');
    window.location.href = '/lead-servicos';
  };

  return (
    <section 
      id="hero" 
      className="hero-modern relative min-h-screen flex items-center"
      aria-label="Hero section - GS Aprova educational services"
    >
      {/* Background Image - Optimized for LCP */}
      <img 
        src={heroBgImage} 
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        fetchPriority="high"
        loading="eager"
        width="1920"
        height="1080"
        style={{ objectPosition: 'center' }}
      />
      
      {/* Floating Elements */}
      <div className="floating-element top-20 left-10 text-white/30 hidden lg:block">
        <Calculator size={40} aria-hidden="true" />
      </div>
      <div className="floating-element top-32 right-16 text-white/30 hidden lg:block" style={{animationDelay: '1s'}}>
        <BookOpen size={35} aria-hidden="true" />
      </div>
      <div className="floating-element bottom-40 left-20 text-white/30 hidden lg:block" style={{animationDelay: '2s'}}>
        <Target size={30} aria-hidden="true" />
      </div>
      <div className="floating-element top-48 right-32 text-white/30 hidden lg:block" style={{animationDelay: '3s'}}>
        <Zap size={45} aria-hidden="true" />
      </div>
      <div className="floating-element bottom-32 right-10 text-white/30 hidden lg:block" style={{animationDelay: '4s'}}>
        <TrendingUp size={38} aria-hidden="true" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Main Value Proposition */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6 tracking-tight">
            {headline}
          </h1>
          
          {/* Supporting Subheadline */}
          <p className="text-lg sm:text-xl lg:text-2xl text-white/95 leading-relaxed mb-8 font-medium max-w-3xl mx-auto">
            {subheadline}
          </p>
          
          {/* Social Proof Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-8 max-w-2xl mx-auto">
            <div className="bg-white/95 backdrop-blur-md rounded-xl p-4 sm:p-6 text-center shadow-2xl border border-white/20 transform hover:scale-105 transition-all duration-300">
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {socialProof.studentsCount}+
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground font-medium">Nota Redação</div>
            </div>
            <div className="bg-white/95 backdrop-blur-md rounded-xl p-4 sm:p-6 text-center shadow-2xl border border-white/20 transform hover:scale-105 transition-all duration-300">
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                R$ {socialProof.averageScore}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground font-medium">A partir de</div>
            </div>
            <div className="bg-white/95 backdrop-blur-md rounded-xl p-4 sm:p-6 text-center shadow-2xl border border-white/20 transform hover:scale-105 transition-all duration-300">
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {socialProof.approvalRate}%
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground font-medium">Aprovação</div>
            </div>
          </div>
          
          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Button 
              onClick={primaryCTA?.action || handleWhatsAppClick}
              className="w-full sm:w-auto btn-hero text-lg px-10 py-6 font-bold"
              size="lg"
              aria-label="Start your studies now via WhatsApp"
            >
              {primaryCTA?.text || "Começar agora no WhatsApp"}
            </Button>
            
            <Button 
              onClick={secondaryCTA?.action || handleServicesClick}
              className="w-full sm:w-auto btn-hero-secondary text-lg px-10 py-6 font-bold"
              variant="outline"
              size="lg"
              aria-label="Choose your educational service"
            >
              {secondaryCTA?.text || "Quero escolher meu serviço"}
            </Button>
          </div>
          
        </div>
      </div>
    </section>
  );
};