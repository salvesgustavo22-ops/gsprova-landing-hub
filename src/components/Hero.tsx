import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { trackWhatsAppClick } from "@/lib/analytics";
import heroImage from "@/assets/hero-student-new.jpg";

interface HeroVariant {
  id: string;
  headline: string;
  subheadline: string;
  cta: string;
  badge: string;
}

const variants: HeroVariant[] = [
  {
    id: "nota-900",
    headline: "Nota 900+: leve sua redação para outro nível",
    subheadline: "Suba sua redação da nota 700 para 900+ com feedback prático e metodologia comprovada",
    cta: "Falar no WhatsApp agora",
    badge: "Foco em Excelência"
  },
  {
    id: "reta-final", 
    headline: "Reta Final: acelere sua preparação para o ENEM",
    subheadline: "Aprenda só o que cai e acelere seu desempenho na reta final com método objetivo",
    cta: "Começar minha preparação hoje",
    badge: "Urgência & Performance"
  },
  {
    id: "agiliza",
    headline: "Agiliza: aprender pode ser simples e direto", 
    subheadline: "Entenda fácil, sem enrolação. Estudo direto ao ponto com preços acessíveis",
    cta: "Tirar minha dúvida já",
    badge: "Simples & Acessível"
  }
];

export const Hero = () => {
  const [currentVariant, setCurrentVariant] = useState<HeroVariant>(variants[0]);

  useEffect(() => {
    // Simple A/B test logic - can be enhanced with proper testing tools
    const variantIndex = Math.floor(Math.random() * variants.length);
    setCurrentVariant(variants[variantIndex]);
  }, []);

  const handleCTAClick = () => {
    trackWhatsAppClick('Hero CTA', currentVariant.id);
    
    const message = encodeURIComponent("Oi, quero saber mais sobre aulas de Matemática/Redação. Vim pelo site GS Aprova.");
    window.open(`https://wa.me/5511974969036?text=${message}`, '_blank');
  };

  return (
    <section className="relative overflow-hidden bg-primary text-white">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">            
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-white">
                GS Aprova
                <br />
                <span className="text-accent">
                  {currentVariant.headline.split(': ')[1]}
                </span>
              </h1>
              
              <p className="text-lg text-white/80 leading-relaxed max-w-lg">
                {currentVariant.subheadline}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => window.location.href = '/contato'}
                className="btn-hero text-lg px-8 py-6"
              >
                Começar minha preparação hoje
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