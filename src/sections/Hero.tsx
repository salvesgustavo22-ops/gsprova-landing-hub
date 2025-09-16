import { Button } from "@/components/ui/button";
import { BUSINESS_WHATSAPP_URL } from "@/lib/constants";
import { trackWhatsAppClick } from "@/lib/analytics";
import heroStudentImage from "@/assets/hero-student-18yo.jpg";

export default function Hero() {
  const handleWhatsAppClick = () => {
    trackWhatsAppClick('hero_whatsapp_click', 'primary_cta');
    const message = encodeURIComponent("Quero minha aula");
    window.open(`${BUSINESS_WHATSAPP_URL}?text=${message}`, '_blank');
  };

  const handleViewPlansClick = () => {
    trackWhatsAppClick('hero_view_plans_click', 'secondary_cta');
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-gradient-to-br from-background via-accent/5 to-primary/5">
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center max-w-7xl mx-auto">
          {/* Left column: text */}
          <div className="space-y-6">
            <p className="text-sm font-bold tracking-wide uppercase text-primary/80 mb-2">
              Promoção de Início de Turma
            </p>
            
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-foreground">
              Comece hoje sua preparação para o ENEM com até{" "}
              <span className="text-primary">30% OFF</span>
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Aulas ao vivo + trilha de estudos + correção de redação — do básico ao avançado, no seu ritmo.
            </p>

            <ul className="space-y-3 text-base text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">•</span>
                <span>Plano flexível para sua rotina</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">•</span>
                <span>Correções com feedback prático</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg">•</span>
                <span>Suporte direto no WhatsApp</span>
              </li>
            </ul>

            <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
              <Button
                onClick={handleWhatsAppClick}
                className="w-full sm:w-auto rounded-xl px-6 py-3 text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all transform hover:scale-105"
                data-analytics="hero_whatsapp_click"
              >
                Quero minha aula
              </Button>
              
              <Button
                onClick={handleViewPlansClick}
                variant="outline"
                className="w-full sm:w-auto rounded-xl px-6 py-3 text-lg font-semibold border-2 border-primary/20 text-primary hover:bg-primary/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all"
                data-analytics="hero_view_plans_click"
              >
                Ver planos com desconto
              </Button>
            </div>

            <div className="pt-2 space-y-2">
              <p className="text-sm text-primary font-medium">
                Válido até 30/09 • Vagas limitadas
              </p>
              
              <p className="text-xs text-muted-foreground/80">
                +15 anos ajudando alunos a aprovarem • Fundado por professor com experiência em vestibulares
              </p>
            </div>
          </div>

          {/* Right column: image / illustration */}
          <div className="relative">
            <div className="relative">
              <img
                src={heroStudentImage}
                alt="Estudante revisando conteúdo para o ENEM"
                className="w-full h-auto rounded-2xl shadow-2xl object-cover max-h-[600px]"
                loading="eager"
                fetchPriority="high"
              />
              
              {/* Floating promo badge on image */}
              <div className="absolute -top-4 -left-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold text-sm shadow-lg transform rotate-[-12deg]">
                30% OFF
              </div>
              
              {/* Gradient overlay for better contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}