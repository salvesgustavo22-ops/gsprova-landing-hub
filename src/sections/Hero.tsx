import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Trophy, PenTool, CheckCircle2, MessageCircle, Target } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { BUSINESS_WHATSAPP_URL, WHATSAPP_MESSAGES } from "@/lib/constants";
import { MiniForm } from "@/components/MiniForm";
import heroStudentImage from "@/assets/hero-student-18yo.jpg";

export default function Hero() {
  const handlePrimaryCTAClick = () => {
    trackEvent('hero_whatsapp_click', { source: 'primary_cta' });
    const message = encodeURIComponent("Oi, quero falar sobre aulas de Matemática e correção de Redação. Vim pelo site GS Aprova.");
    window.open(`${BUSINESS_WHATSAPP_URL}?text=${message}`, '_blank');
  };

  return (
    <section className="relative bg-gradient-to-br from-[#0C3B8E] via-[#0E4FB0] to-[#1B6CFF] min-h-[72vh] md:min-h-[80vh] overflow-hidden">
      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black/15 md:bg-black/15"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start max-w-7xl mx-auto">
          {/* Left column: content */}
          <div className="order-2 md:order-1 space-y-6">
            <div>
              <h1 className="text-white text-3xl md:text-5xl font-extrabold leading-tight tracking-[-0.02em] mb-4">
                Redação ENEM com feedback prático + Matemática sem enrolação.
              </h1>
              
              <h2 className="text-white/90 text-base md:text-lg">
                Correções com devolutiva objetiva, trilhas e simulados focados no que mais cai.
              </h2>
            </div>

            {/* USP Bullets - Mobile: above form, Desktop: left side */}
            <div className="md:hidden space-y-3">
              <div className="flex items-center space-x-3 text-white/90">
                <CheckCircle2 className="w-5 h-5 text-white" />
                <span className="text-sm">Correção com critérios do ENEM</span>
              </div>
              <div className="flex items-center space-x-3 text-white/90">
                <Target className="w-5 h-5 text-white" />
                <span className="text-sm">Trilha prática por nível</span>
              </div>
              <div className="flex items-center space-x-3 text-white/90">
                <MessageCircle className="w-5 h-5 text-white" />
                <span className="text-sm">Suporte direto no WhatsApp</span>
              </div>
            </div>

            {/* Desktop USP Bullets */}
            <div className="hidden md:block space-y-4">
              <div className="flex items-center space-x-4 text-white/90">
                <CheckCircle2 className="w-6 h-6 text-white" />
                <span>Correção com critérios do ENEM</span>
              </div>
              <div className="flex items-center space-x-4 text-white/90">
                <Target className="w-6 h-6 text-white" />
                <span>Trilha prática por nível</span>
              </div>
              <div className="flex items-center space-x-4 text-white/90">
                <MessageCircle className="w-6 h-6 text-white" />
                <span>Suporte direto no WhatsApp</span>
              </div>
            </div>

            {/* Primary CTA */}
            <div className="mt-6">
              <Button
                onClick={handlePrimaryCTAClick}
                className="w-full md:w-auto rounded-xl px-8 py-4 text-lg font-semibold bg-white text-gray-900 hover:bg-gray-100 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white transition-all transform hover:scale-105"
                aria-label="Falar no WhatsApp"
              >
                Falar no WhatsApp
              </Button>
            </div>

            {/* Social Proof Cards - Desktop only */}
            <div className="hidden md:grid grid-cols-3 gap-3 mt-8">
              <Card className="bg-white/10 backdrop-blur-md border border-white/15 text-white">
                <CardContent className="p-3 text-center">
                  <Users className="size-5 opacity-90 mx-auto mb-2" />
                  <div className="font-bold text-sm">+900</div>
                  <div className="text-xs opacity-90">alunos atendidos</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-md border border-white/15 text-white">
                <CardContent className="p-3 text-center">
                  <Trophy className="size-5 opacity-90 mx-auto mb-2" />
                  <div className="font-bold text-sm">95%</div>
                  <div className="text-xs opacity-90">de aprovação</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-md border border-white/15 text-white">
                <CardContent className="p-3 text-center">
                  <PenTool className="size-5 opacity-90 mx-auto mb-2" />
                  <div className="font-bold text-sm">70/100</div>
                  <div className="text-xs opacity-90">nota média em redação</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right column: Mini Form */}
          <div className="order-1 md:order-2">
            <MiniForm source="hero_miniform" />
          </div>
        </div>
      </div>
    </section>
  );
}