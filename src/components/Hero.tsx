import { Button } from '@/components/ui/button';
import { trackWhatsAppClick, trackPageSection } from '@/lib/analytics';
import { Calculator, BookOpen, Target, Zap, TrendingUp, Award } from 'lucide-react';
import heroBgImage from '@/assets/hero-modern-bg.jpg';

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
  headline = 'Matemática e Redação para Vestibulares, Concursos e Reforço Escolar',
  subheadline = 'Aulas online, correção de redação personalizada e trilha de estudos focada no que mais cai. Simulados e suporte direto no WhatsApp.',
  socialProof = {
    studentsCount: 900,
    averageScore: 70,
    approvalRate: 95,
  },
  primaryCTA,
  secondaryCTA,
}: HeroProps) => {
  const handleWhatsAppClick = () => {
    trackWhatsAppClick('hero_main_cta', 'whatsapp_direct');
    const message = encodeURIComponent(
      'Oi, quero começar agora meus estudos para ENEM/Fuvest 2025. Vim pelo site GS Aprova.'
    );
    window.open(`https://wa.me/5511974969036?text=${message}`, '_blank');
  };

  const handleServicesClick = () => {
    trackPageSection('hero_services_cta', 'navigation');
    window.location.href = '/lead-servicos';
  };

  return (
    <section
      id="hero"
      className="hero-modern relative flex min-h-screen items-center"
      aria-label="Hero section - GS Aprova educational services"
    >
      {/* Background Image - Optimized for LCP */}
      <img
        src={heroBgImage}
        alt=""
        className="absolute inset-0 size-full object-cover opacity-30"
        fetchPriority="high"
        loading="eager"
        width="1920"
        height="1080"
        style={{ objectPosition: 'center' }}
      />

      {/* Floating Elements */}
      <div className="floating-element left-10 top-20 hidden text-white/30 lg:block">
        <Calculator size={40} aria-hidden="true" />
      </div>
      <div
        className="floating-element right-16 top-32 hidden text-white/30 lg:block"
        style={{ animationDelay: '1s' }}
      >
        <BookOpen size={35} aria-hidden="true" />
      </div>
      <div
        className="floating-element bottom-40 left-20 hidden text-white/30 lg:block"
        style={{ animationDelay: '2s' }}
      >
        <Target size={30} aria-hidden="true" />
      </div>
      <div
        className="floating-element right-32 top-48 hidden text-white/30 lg:block"
        style={{ animationDelay: '3s' }}
      >
        <Zap size={45} aria-hidden="true" />
      </div>
      <div
        className="floating-element bottom-32 right-10 hidden text-white/30 lg:block"
        style={{ animationDelay: '4s' }}
      >
        <TrendingUp size={38} aria-hidden="true" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main Value Proposition */}
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {headline}
          </h1>

          {/* Supporting Subheadline */}
          <p className="mx-auto mb-8 max-w-3xl text-lg font-medium leading-relaxed text-white/95 sm:text-xl lg:text-2xl">
            {subheadline}
          </p>

          {/* Social Proof Stats */}
          <div className="mx-auto mb-8 grid max-w-2xl grid-cols-3 gap-4 sm:gap-6">
            <div className="rounded-xl border border-white/20 bg-white/95 p-4 text-center shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 sm:p-6">
              <div className="bg-gradient-to-r from-primary to-accent bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
                {socialProof.studentsCount}+
              </div>
              <div className="text-xs font-medium text-muted-foreground sm:text-sm">
                Nota Redação
              </div>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/95 p-4 text-center shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 sm:p-6">
              <div className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
                R$ {socialProof.averageScore}
              </div>
              <div className="text-xs font-medium text-muted-foreground sm:text-sm">
                A partir de
              </div>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/95 p-4 text-center shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 sm:p-6">
              <div className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
                {socialProof.approvalRate}%
              </div>
              <div className="text-xs font-medium text-muted-foreground sm:text-sm">Aprovação</div>
            </div>
          </div>

          {/* Primary CTAs */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <Button
              onClick={primaryCTA?.action || handleWhatsAppClick}
              className="btn-hero w-full px-10 py-6 text-lg font-bold sm:w-auto"
              size="lg"
              aria-label="Start your studies now via WhatsApp"
            >
              {primaryCTA?.text || 'Começar agora no WhatsApp'}
            </Button>

            <Button
              onClick={secondaryCTA?.action || handleServicesClick}
              className="btn-hero-secondary w-full px-10 py-6 text-lg font-bold sm:w-auto"
              variant="outline"
              size="lg"
              aria-label="Choose your educational service"
            >
              {secondaryCTA?.text || 'Quero escolher meu serviço'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
